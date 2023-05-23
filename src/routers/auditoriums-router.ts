import { Router } from 'express';
import { getAuditoriums } from '@/controllers';

const auditoriumsRouter = Router();

auditoriumsRouter.get('/', getAuditoriums);
export { auditoriumsRouter };
