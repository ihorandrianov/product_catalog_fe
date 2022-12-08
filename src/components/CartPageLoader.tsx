import ContentLoader from 'react-content-loader';

const CartGrid = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ContentLoader
      width={1200}
      height={800}
      viewBox="0 0 800 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{
        left: '10px',
        top: '50px',
      }}
    >
      <rect x="62" y="12" rx="2" ry="2" width="66" height="10" />
      <rect x="62" y="35" rx="2" ry="2" width="140" height="35" />
      <rect x="62" y="102" rx="2" ry="2" width="450" height="80" />
      <rect x="62" y="198" rx="2" ry="2" width="450" height="80" />
      <rect x="528" y="102" rx="2" ry="2" width="250" height="150" />
    </ContentLoader>
  </div>
);

export default CartGrid;