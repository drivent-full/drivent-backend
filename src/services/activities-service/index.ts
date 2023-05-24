import { conflictError, notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getActivitiesService() {
  return activitiesRepository.getActivities();
}

async function getActivitiesDatesService() {
  return activitiesRepository.getActivityDates();
}

async function getActivitiesByDatesService(date: Date, userId = -1) {
  return activitiesRepository.getActivitiesByDates(date, userId);
}

async function subscribe(userId: number, activityId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status !== 'PAID' || ticket.TicketType.isRemote) {
    throw notFoundError();
  }
  const activityExists = await activitiesRepository.getActivityById(activityId);
  if (!activityExists) throw notFoundError();
  if (activityExists.vacancies <= 0) throw conflictError('Not enough vacancies');
  const subscriptions = await activitiesRepository.getSubscriptions(userId);
  if (subscriptions.find((s) => s.activityId === activityId)) {
    throw conflictError('Already subscribed');
  }
  await activitiesRepository.subscribe(userId, activityId);
}

const activitiesService = {
  getActivitiesService,
  getActivitiesDatesService,
  getActivitiesByDatesService,
  subscribe,
};

export default activitiesService;
