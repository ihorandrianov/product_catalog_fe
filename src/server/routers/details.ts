import { procedure, router } from '../trpc';
import z, { string } from 'zod';
import { prisma } from '../prisma';

export const detailsRouter = router({
  getByModel: procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return await prisma.phoneDetails.findMany({
        where: {
          namespaceId: input.id,
        },
      });
    }),
});
