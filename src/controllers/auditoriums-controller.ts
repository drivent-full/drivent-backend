import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import auditoriumsService from '@/services/auditoriums-service';

export async function getAuditoriums(_req: Request, res: Response, next: NextFunction) {
  try {
    const auditoriums = await auditoriumsService.getAuditoriumsService();
    return res.status(httpStatus.OK).send(auditoriums);
  } catch (error) {
    next(error);
  }
}
