import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, changeBooking, listBooking, listAllBooking } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/all', listAllBooking)
  .get('', listBooking)
  .post('', bookingRoom)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
