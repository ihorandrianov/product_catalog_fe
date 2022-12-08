import { z } from 'zod';
import { prisma } from '../prisma';
import { protectedProcedure, router } from '../trpc';

export const cartRouter = router({
  cartRoute: protectedProcedure.query(async ({ ctx }) => {
    const id = ctx.session.user.id;
    const cart = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        cart: {
          include: {
            phone: true,
          }
        }
      }
    })

    return cart;
  }),

  

  addNewItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;

      await prisma.cartItem.create({
        data: {
          userId: id,
          phoneId: input,
          quantity: 1,
        }
      })
    }),

  updatePlus: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;

      await prisma.cartItem.update({
        where: {
          userId_phoneId: {
            userId: id,
            phoneId: input,
          },
        },
        data: {
          quantity: {
            increment: 1,
          }
        }
      });
    }),

  updateMinus: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;

      await prisma.cartItem.update({
        where: {
          userId_phoneId: {
            userId: id,
            phoneId: input,
          },
        },
        data: {
          quantity: {
            decrement: 1,
          }
        }
      });
    }),

  deleteItem: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const id = ctx.session.user.id;

      await prisma.cartItem.delete({
        where: {
          userId_phoneId: {
            userId: id,
            phoneId: input,
          },
        },
      })
    })
});
