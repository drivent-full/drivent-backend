import { Prisma } from '@prisma/client';
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

const activitiesRepository = {
  getActivities,
  getActivityDates,
};

export default activitiesRepository;
