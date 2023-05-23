import activitiesRepository from '@/repositories/activities-repository';

async function getActivitiesService() {
  return activitiesRepository.getActivities();
}

async function getActivitiesDatesService() {
  return activitiesRepository.getActivityDates();
}

async function getActivitiesByDatesService(date: Date) {
  return activitiesRepository.getActivitiesByDates(date);
}

const activitiesService = {
  getActivitiesService,
  getActivitiesDatesService,
  getActivitiesByDatesService,
};

export default activitiesService;
