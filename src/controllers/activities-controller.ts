import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';

import activitiesService from '@/services/activities-service';

export async function getActivitiesController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const datestr = req.query.date as string;
  const date = new Date(datestr);
  const dateValid = date instanceof Date && !isNaN(date.valueOf());
  const { userId } = req;
  try {
    let activities = [];
    if (!dateValid) activities = await activitiesService.getActivitiesService();
    else activities = await activitiesService.getActivitiesByDatesService(date, userId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function getActivitiesDatesController(_req: Request, res: Response, next: NextFunction) {
  try {
    const dates = await activitiesService.getActivitiesDatesService();
    return res.status(httpStatus.OK).send(dates);
  } catch (error) {
    next(error);
  }
}

export async function subscribeController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const { activityId } = req.body;
    await activitiesService.subscribe(userId, parseInt(activityId));
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}
