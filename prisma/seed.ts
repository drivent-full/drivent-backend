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

  const nHotels = await prisma.hotel.findFirst();
  if (!nHotels) {
    await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://www.essemundoenosso.com.br/wp-content/uploads/2021/07/salinas-maceio.jpg',
        Rooms: {
          create: [
            { name: '101', capacity: 2 },
            { name: '102', capacity: 1 },
            { name: '103', capacity: 3 },
            { name: '201', capacity: 1 },
            { name: '202', capacity: 3 },
          ],
        },
      },
    });
  }
  const nAuditoriums = await prisma.auditorium.count();

  if (!nAuditoriums) {
    const nineOClock = dayjs().startOf('day').add(1, 'day');
    await prisma.auditorium.create({
      data: {
        name: 'Auditório Principal',
        Activity: {
          createMany: {
            data: [
              {
                title: 'Minecraft: montando o PC ideal',
                startsAt: nineOClock.set('hours', 9).toDate(),
                endsAt: nineOClock.set('hours', 10).toDate(),
                vacancies: 30,
              },
              {
                title: 'LoL: montando o PC ideal',
                startsAt: nineOClock.set('hours', 10).toDate(),
                endsAt: nineOClock.set('hours', 11).toDate(),
                vacancies: 6,
              },
              {
                title: 'LoL: montando o PC ideal - segundo dia',
                startsAt: nineOClock.add(1, 'day').set('hours', 10).toDate(),
                endsAt: nineOClock.add(1, 'day').set('hours', 11).toDate(),
                vacancies: 4,
              },
            ],
          },
        },
      },
    });

    await prisma.auditorium.create({
      data: {
        name: 'Auditório Lateral',
        Activity: {
          createMany: {
            data: [
              {
                title: 'Palestra x',
                startsAt: nineOClock.set('hours', 9).toDate(),
                endsAt: nineOClock.set('hours', 11).toDate(),
                vacancies: 30,
              },
              {
                title: 'Palestra x terceiro dia',
                startsAt: nineOClock.add(1, 'day').set('hours', 9).toDate(),
                endsAt: nineOClock.add(1, 'day').set('hours', 11).toDate(),
                vacancies: 2,
              },
            ],
          },
        },
      },
    });

    await prisma.auditorium.create({
      data: {
        name: 'Sala de Workshop',
        Activity: {
          createMany: {
            data: [
              {
                title: 'Palestra y',
                startsAt: nineOClock.set('hours', 11).toDate(),
                endsAt: nineOClock.set('hours', 12).toDate(),
                vacancies: 20,
              },
              {
                title: 'Palestra z',
                startsAt: nineOClock.set('hours', 10).toDate(),
                endsAt: nineOClock.set('hours', 11).toDate(),
                vacancies: 8,
              },
              {
                title: 'Palestra zz',
                startsAt: nineOClock.set('hours', 20).toDate(),
                endsAt: nineOClock.set('hours', 22).toDate(),
                vacancies: 8,
              },
            ],
          },
        },
      },
    });
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
