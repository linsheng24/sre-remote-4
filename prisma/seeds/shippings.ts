import { DeliveryStatus } from 'type';

export default [
  {
    id: 1,
    sno: '123456789',
    status: 'IN_TRANSIT' as DeliveryStatus,
    estimatedDelivery: '2023-04-05',
    recipientId: 1234,
    details: [
      {
        id: 1234,
        date: '2023-03-30',
        time: '14:00',
        status: 'PACKAGE_RECEIVED' as DeliveryStatus,
        locationId: 1,
      },
      {
        id: 1235,
        date: '2023-03-31',
        time: '10:30',
        status: 'IN_TRANSIT' as DeliveryStatus,
        locationId: 7,
      },
      {
        id: 1236,
        date: '2023-04-01',
        time: '16:45',
        status: 'OUT_FOR_DELIVERY' as DeliveryStatus,
        locationId: 18,
      },
      {
        id: 1237,
        date: '2023-04-02',
        time: '09:15',
        status: 'DELIVERED' as DeliveryStatus,
        locationId: 4,
      },
    ],
  },
];
