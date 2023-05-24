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

async function getActivitiesByDates(date: Date, userId: number): Promise<Activity[]> {
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
      subscribed: (await prisma.subscription.count({ where: { activityId: activity.id, userId } })) >= 1,
    })),
  );

  return activitiesWithAvailability;
}

async function getSubscriptions(userId: number) {
  const subs = await prisma.subscription.findMany({
    where: {
      userId,
    },
    include: {
      Activity: true,
    },
  });

  return subs;
}

async function getActivityById(activityId: number) {
  const activity = await prisma.activity.findUnique({ where: { id: activityId } });
  if (activity) activity.vacancies -= await prisma.subscription.count({ where: { activityId } });
  return activity;
}

async function subscribe(userId: number, activityId: number) {
  await prisma.subscription.create({
    data: {
      userId,
      activityId,
    },
  });
}

const activitiesRepository = {
  getActivities,
  getActivityDates,
  getActivitiesByDates,
  getSubscriptions,
  getActivityById,
  subscribe,
};

export default activitiesRepository;
