import { Request, Response } from 'express';
import httpStatus from 'http-status';
import eventsService from '@/services/events-service';
import { getRedis, saveRedis } from '@/utils/redis';

export async function getDefaultEvent(_req: Request, res: Response) {
  try {
    let event = await getRedis('event');
    if (!event) {
      event = await eventsService.getFirstEvent();
      saveRedis({ event: event });
    }
    return res.status(httpStatus.OK).send(event);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
