import Header from '../components/Header';
import classNames from 'classnames';
import typography from '../styles/Typography.module.css';
import { Footer } from '../components/Footer';
import Head from 'next/head';
import { Recomended } from '../components/Recomended';
import { HomePageTopSlider } from '../components/HomePageTopSlider';

export default function Home() {
  return (
    <>
      <Head>
        <title>NiceGadgets</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Main page of NiceGadgets" />
      </Head>
      <Header />
      <h1 className={classNames('mainTitle', typography.h1)}>
        Welcome to Nice Gadgets store!
      </h1>
      <HomePageTopSlider />
      <Recomended title="Brand new models" order="new" />
      <Recomended title="Hot prices" order="hot" />
      <Footer />
    </>
  );
}
