import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  console.log({ event });

  const nTickets = await prisma.ticketType.count();
  if (nTickets < 3) {
    await prisma.ticketType.createMany({
      data: [
        { name: 'Online', isRemote: true, includesHotel: false, price: 100 },
        { name: 'Sem Hotel', isRemote: false, includesHotel: false, price: 250 },
        { name: 'Com hotel', isRemote: false, includesHotel: true, price: 600 },
      ],
    });
  }

  const nHotels = await prisma.hotel.findFirst()
  if (!nHotels) {
    await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://www.essemundoenosso.com.br/wp-content/uploads/2021/07/salinas-maceio.jpg',
        Rooms: {
          create: [
            { name: 'Single', capacity: 10 },
            { name: 'Double', capacity: 7 },
          ]
        }
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
