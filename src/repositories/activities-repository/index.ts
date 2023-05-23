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

const activitiesRepository = {
  getActivities,
};

export default activitiesRepository;
