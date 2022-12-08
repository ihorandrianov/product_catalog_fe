import Head from 'next/head';
import { Footer } from '../../components/Footer';
import Header from '../../components/Header';
import { PaginationPage } from '../../components/PaginationPage';

function Phones({}) {
  return (
    <>
      <Head>
        <title>Phones</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Phones catalog" />
      </Head>
      <Header />
      <PaginationPage />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Phones;
