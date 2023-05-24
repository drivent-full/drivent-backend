import { Router } from 'express';
import {
  getActivitiesController,
  getActivitiesDatesController,
  subscribeController,
} from '@/controllers/activities-controller';
import { subscribeSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivitiesController)
  .get('/dates', getActivitiesDatesController)
  .post('/', validateBody(subscribeSchema), subscribeController);
export { activitiesRouter };
