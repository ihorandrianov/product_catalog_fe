import { router } from '../trpc';
import { cartRouter } from './cart';
import { detailsRouter } from './details';
import { productsRouter } from './products';

export const appRouter = router({
  products: productsRouter,
  details: detailsRouter,
  cart: cartRouter,
});

export type AppRouter = typeof appRouter;
