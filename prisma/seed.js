import { PrismaClient } from '@prisma/client';
import p from '../public/db.json';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

const load = () => {
  Promise.all(p.map((n) => prisma.phones.create({ data: n })))
    .then(() => console.info('[SEED] Succussfully create phone records'))
    .catch((e) => console.error('[SEED] Failed to create phone records', e));
};

const targetPath = path.join('seeding_material', 'phones');
const seed = async () => {
  try {
    const files = await fs.readdir(targetPath);
    for (const file of files) {
      const filePath = path.join(targetPath, file);
      const fileString = await fs.readFile(filePath, 'utf-8');
      const fileObj = await JSON.parse(fileString);
      await prisma.phoneDetails.create({
        data: fileObj,
      });
      console.log('succesfully created');
    }
  } catch (e) {
    console.log(e);
  }
};

seed();
