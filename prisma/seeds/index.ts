import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import * as path from 'path';
console.log(path);
const readJsonFile = async (filePath) => {
  const jsonString = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(jsonString);
  return data;
};

const prisma = new PrismaClient();
async function main() {
  const locations = await readJsonFile(path.join(__dirname, 'locations.json'));
  const recipients = await readJsonFile(
    path.join(__dirname, 'recipients.json'),
  );
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
