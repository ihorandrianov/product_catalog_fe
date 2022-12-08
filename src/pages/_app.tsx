import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import localFont from '@next/font/local';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

const mont = localFont({
  src: [
    {
      path: '../../public/fonts/Mont-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Mont-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Mont-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
});

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main className={mont.className}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
};

export default trpc.withTRPC(App);
