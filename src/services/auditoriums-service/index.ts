import auditoriumsRepository from '@/repositories/auditoriums-repository';

async function getAuditoriumsService() {
  return auditoriumsRepository.getActivities();
}

const auditoriumsService = {
  getAuditoriumsService,
};

export default auditoriumsService;
