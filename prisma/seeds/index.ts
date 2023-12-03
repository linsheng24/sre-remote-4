import { PrismaClient } from '@prisma/client';
import locations from './locations';
import recipients from './recipients';
import shippings from './shippings';

const prisma = new PrismaClient();
async function main() {
  for (const location of locations) {
    await prisma.location.upsert({
      where: { id: location.location_id },
      update: {},
      create: {
        id: location.location_id,
        title: location.title,
        city: location.city,
        address: location.address,
      },
    });
  }

  for (const recipient of recipients) {
    await prisma.recipient.upsert({
      where: { id: recipient.id },
      update: {},
      create: recipient,
    });
  }

  for (const shipping of shippings) {
    await prisma.shipping.upsert({
      where: { id: shipping.id },
      update: {},
      create: {
        id: shipping.id,
        sno: shipping.sno,
        status: shipping.status,
        estimated_delivery: new Date(shipping.estimatedDelivery),
        recipientId: shipping.recipientId,
        details: {
          create: shipping.details.map((item) => ({
            id: item.id,
            status: item.status,
            locationId: item.locationId,
            updatedAt: new Date(`${item.date} ${item.time}`),
          })),
        },
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
