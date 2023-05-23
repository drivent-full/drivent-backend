import { Router } from 'express';
import { getActivitiesController } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivitiesController);
export { activitiesRouter };
