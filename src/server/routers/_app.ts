import { router } from '../trpc';
import { detailsRouter } from './details';
import { productsRouter } from './products';

export const appRouter = router({
  products: productsRouter,
  details: detailsRouter,
});

export type AppRouter = typeof appRouter;
