import { Activity, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { prisma } from '@/config';

async function getActivities() {
  const activities = await prisma.activity.findMany({
    include: {
      Auditorium: true,
    },
  });

  // subtract # of current subscriptions from  # of vacancies
  // returns only the # of available spots
  const activitiesWithAvailability = await Promise.all(
    activities.map(async (activity) => ({
      ...activity,
      vacancies: activity.vacancies - (await prisma.subscription.count({ where: { activityId: activity.id } })),
    })),
  );

  return activitiesWithAvailability;
}

async function getActivityDates(): Promise<[{ date: string }]> {
  const data = (await prisma.$queryRaw(Prisma.sql`
      SELECT DISTINCT DATE("Activity"."startsAt" AT TIME ZONE 'UTC' AT TIME ZONE 'America/Sao_Paulo' ) as date
      FROM "Activity"
  `)) as [{ date: string }];

  return data;
}

async function getActivitiesByDates(date: Date): Promise<Activity[]> {
  const date2 = dayjs(date).add(1, 'days').toDate();
  const activities = await prisma.activity.findMany({
    include: {
      Auditorium: true,
    },

    where: {
      startsAt: {
        gte: date,
        lt: date2,
      },
    },
  });

  const activitiesWithAvailability = await Promise.all(
    activities.map(async (activity) => ({
      ...activity,
      vacancies: activity.vacancies - (await prisma.subscription.count({ where: { activityId: activity.id } })),
    })),
  );

  return activitiesWithAvailability;
}

const activitiesRepository = {
  getActivities,
  getActivityDates,
  getActivitiesByDates,
};

export default activitiesRepository;
