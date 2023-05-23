import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesService() {
  return activitiesRepository.getActivities();
}

async function getActivitiesDatesService() {
  return activitiesRepository.getActivityDates();
}

const activitiesService = {
  getActivitiesService,
  getActivitiesDatesService,
};

export default activitiesService;
