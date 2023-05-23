import { Router } from 'express';
import { getActivitiesController, getActivitiesDatesController } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivitiesController).get('/dates', getActivitiesDatesController);
export { activitiesRouter };
