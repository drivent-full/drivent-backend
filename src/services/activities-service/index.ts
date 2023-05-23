import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesService() {
  return activitiesRepository.getActivities();
}

const activitiesService = {
  getActivitiesService,
};

export default activitiesService;
