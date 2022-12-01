import { NextPage } from 'next';
import { Footer } from '../../components/Footer';
import { PaginationPage } from '../../components/PaginationPage';
import { SampleComponent } from '../../components/SampleComponent';

function Phones({}) {
  return (
    <div>
      <PaginationPage />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Phones;
