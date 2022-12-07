import { router } from '../trpc';
import { cartRouter } from './cart';
import { detailsRouter } from './details';
import { productsRouter } from './products';
import { favouritesRouter } from './favourites';

export const appRouter = router({
  products: productsRouter,
  details: detailsRouter,
  cart: cartRouter,
  favourites: favouritesRouter,
});

export type AppRouter = typeof appRouter;
