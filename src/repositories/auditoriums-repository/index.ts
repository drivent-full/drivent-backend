import { prisma } from '@/config';

async function getActivities() {
  return await prisma.auditorium.findMany({});
}

const auditoriumsRepository = {
  getActivities,
};

export default auditoriumsRepository;
