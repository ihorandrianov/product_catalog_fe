import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>NiceGadgets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Main page of NiceGadgets" />
      </Head>
      <Header />
      <Footer />
    </>
  );
}
