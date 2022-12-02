import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bulma/css/bulma.css';
import { trpc } from '../utils/trpc';
import localFont from '@next/font/local';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next/types';

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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <main className={mont.className}>
      <Component {...pageProps} />
    </main>,
  );
}

export default trpc.withTRPC(App);
