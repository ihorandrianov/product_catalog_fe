import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'bulma/css/bulma.css';
import { trpc } from '../utils/trpc';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(App);
