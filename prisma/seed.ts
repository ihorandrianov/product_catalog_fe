import { PrismaClient } from '@prisma/client';
import p from '../public/db.json';

const prisma = new PrismaClient();

const load = () => {
  Promise.all(p.map((n) => prisma.phones.create({ data: n })))
    .then(() => console.info('[SEED] Succussfully create phone records'))
    .catch((e) => console.error('[SEED] Failed to create phone records', e));
};

load();
