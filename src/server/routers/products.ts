import { procedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../prisma';

export const productsRouter = router({
  getRecomended: procedure.input(z.string()).query(async ({ input }) => {
    let orderBy
    switch (input) {
      case "recomended":
        orderBy = {
          phoneId: 'desc'
        };
        break;
    
      case "new":
        orderBy = {
          year: 'desc'
        };
        break;
      
      case "hot":
        orderBy = {
          price: 'asc'
        };
        break;
    }
    const items = await prisma.phones.findMany({
      take: 24,
      orderBy,
    });

    return items;
  }),

  getSome: procedure
    .input(
      z.object({
        limit: z.number().min(8).max(24),
        page: z.number().min(0),
        sortBy: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { limit, page, sortBy } = input;

      if (sortBy === 'price') {
        return await prisma.phones.findMany({
          skip: limit * page,
          take: limit,
          orderBy: {
            price: 'desc',
          },
        });
      }

      return await prisma.phones.findMany({
        skip: limit * page,
        take: limit,
        orderBy: {
          year: 'desc',
        },
      });
    }),

  countItems: procedure.query(async () => {
    return await prisma.phones.count({
      select: {
        _all: true,
      },
    });
  }),
});
