import { Controller, Get, Query } from '@nestjs/common';
import * as moment from 'moment';
import prisma from 'prisma/db';
import { DeliveryStatus } from 'type';
import locations from 'prisma/seeds/locations';
import recipients from 'prisma/seeds/recipients';

const statusArr: DeliveryStatus[] = [
  'CREATED',
  'PACKAGE_RECEIVED',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERY_ATTEMPTED',
  'DELIVERED',
  'EXCEPTION',
];

const getRandomStatus = () => {
  const randomIndex = Math.floor(Math.random() * statusArr.length);
  return statusArr[randomIndex];
};

function generateRandomNumberString(length) {
  let randomNumberString = '';
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // 0 到 9 的隨機數字
    randomNumberString += randomDigit.toString();
  }
  return randomNumberString;
}

@Controller('/')
export class AppController {
  @Get('query')
  async search(@Query('sno') sno: string) {
    try {
      const shipping = await prisma.shipping.findUnique({
        where: {
          sno,
        },
        include: {
          recipient: true,
          details: {
            include: {
              location: true,
            },
          },
        },
      });
      return {
        success: true,
        data: {
          sno: shipping.sno,
          tracking_status: shipping.status,
          estimated_delivery: moment(shipping.estimated_delivery).format(
            'YYYY-MM-DD',
          ),
          details: shipping.details.map((item) => ({
            id: item.id,
            date: moment(item.updatedAt).format('YYYY-MM-DD'),
            time: moment(item.updatedAt).format('HH:mm'),
            status: item.status,
            location_id: item.location.id,
            location_title: item.location.title,
          })),
          error: null,
        },
      };
    } catch (e) {
      return {
        status: 'error',
        data: null,
        error: {
          code: 404,
          message: 'Tracking number not found',
        },
      };
    }
  }

  @Get('fake')
  async fake(@Query('num') num: number) {
    const result = [];
    for (let i = 0; i < num; i++) {
      const n = Math.floor(Math.random() * 3) + 1;
      const randomLengthArray = new Array(n).fill(1);
      const shippings = randomLengthArray.map((item, index) => {
        return {
          status: index === n - 1 ? getRandomStatus() : 'DELIVERED',
          locationId:
            locations[Math.floor(Math.random() * locations.length)].location_id,
        };
      });
      console.log(shippings);

      const shipping = await prisma.shipping.create({
        data: {
          sno: generateRandomNumberString(10),
          status: getRandomStatus(),
          estimated_delivery: new Date(),
          recipientId:
            recipients[Math.floor(Math.random() * recipients.length)].id,
          details: {
            create: shippings,
          },
        },
        include: {
          recipient: true,
          details: {
            include: {
              location: true,
            },
          },
        },
      });
      result.push(shipping);
    }
    return result.map((item) => ({
      sno: item.sno,
      tracking_status: item.status,
      estimated_delivery: moment(item.estimated_delivery).format('YYYY-MM-DD'),
      details: item.details.map((item) => ({
        id: item.id,
        date: moment(item.updatedAt).format('YYYY-MM-DD'),
        time: moment(item.updatedAt).format('HH:mm'),
        status: item.status,
        location_id: item.location.id,
        location_title: item.location.title,
      })),
      error: null,
    }));
  }
}
