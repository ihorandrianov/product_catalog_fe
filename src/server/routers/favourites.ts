import z from 'zod';
import { prisma } from '../prisma';
import { protectedProcedure, router } from '../trpc';

export const favouritesRouter = router({
    favoritesRoute: protectedProcedure.query(async ({ ctx }) => {
        const id = ctx.session.user.id;
        const favorites = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                favorites: {
                    include: {
                        phone: true,
                    },
                },
            },
        });
        return favorites;
    }),

    addNewFavorite: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
        const id = ctx.session.user.id;
        
        await prisma.userFavorites.create({
            data: {
                userId: id,
                phoneId: input,
            },
        });
    }),

    removeFavorite: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
        const id = ctx.session.user.id;
        
        await prisma.userFavorites.delete({
            where: {
                userId_phoneId: {
                    userId: id,
                    phoneId: input,
                },  
            }
        });
    }),

    countFav: protectedProcedure.query(async () => {
        return await prisma.userFavorites.count({
          select: {
            _all: true,
          },
        });
      }),

    getFav: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
        const id = ctx.session.user.id;

        const founded = await prisma.userFavorites.findUnique({
            where: {
                userId_phoneId: {
                    userId: id,
                    phoneId: input,
                },  
            }
        });
        
        return founded ? true : false;
    }),
});