import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import activitiesService from '@/services/activities-service';

export async function getActivitiesController(req: Request, res: Response, next: NextFunction) {
  const datestr = req.query.date as string;
  const date = new Date(datestr);
  const dateValid = date instanceof Date && !isNaN(date.valueOf());
  try {
    let activities = [];
    if (!dateValid) activities = await activitiesService.getActivitiesService();
    else activities = await activitiesService.getActivitiesByDatesService(date);
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
