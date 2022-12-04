import { Footer } from '../../components/Footer';
import Header from '../../components/Header';
import { PaginationPage } from '../../components/PaginationPage';

function Phones({}) {
  return (
    <>
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
