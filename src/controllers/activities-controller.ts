import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import activitiesService from '@/services/activities-service';

export async function getActivitiesController(_req: Request, res: Response, next: NextFunction) {
  try {
    const activities = await activitiesService.getActivitiesService();
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
