import { Booking, Hotel, Room } from '@prisma/client';
import { prisma } from '@/config';

type CreateParams = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateParams = Omit<Booking, 'createdAt' | 'updatedAt'>;

async function create({ roomId, userId }: CreateParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function findByUserId(userId: number) {
  const booking: Booking & { Room: Room & { Hotel: Hotel; occupants?: number } } = await prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: {
        include: {
          Hotel: true,
        },
      },
    },
  });
  // includes the total number of occupants as a property of the Room object
  const totalRoomOccupants = booking ? await prisma.booking.count({ where: { roomId: booking.roomId } }) : 0;
  booking.Room.occupants = totalRoomOccupants;
  return booking;
}

async function findAll() {
  return prisma.booking.findMany();
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

const bookingRepository = {
  create,
  findAll,
  findByRoomId,
  findByUserId,
  upsertBooking,
};

export default bookingRepository;
