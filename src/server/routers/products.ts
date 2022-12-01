import { procedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../prisma';

export const productsRouter = router({
  getAll: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(10).nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 5;
      const { cursor } = input;

      const items = await prisma.phones.findMany({
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          id: 'asc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
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
