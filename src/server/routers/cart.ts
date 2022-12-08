import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';

export const cartRouter = router({
  addItem: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        quantity: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;
      const cart = await ctx.prisma.cart.create({
        data: {
          userId: id,
          cartItems: {
            create: [
              {
                itemId: input.id,
                quantity: input.quantity,
              },
            ],
          },
        },
      });
      return cart;
    }),
  getCart: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const cart = ctx.prisma.cart.findFirst({
      where: {
        userId: id,
      },
      include: {
        cartItems: {
          include: {
            item: true,
          },
        },
      },
    });

    return cart;
  }),
});
