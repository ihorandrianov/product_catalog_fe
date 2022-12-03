import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { trpc } from '../utils/trpc';
import localFont from '@next/font/local';

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

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={mont.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default trpc.withTRPC(App);
