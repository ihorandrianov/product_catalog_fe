import ContentLoader from 'react-content-loader';

const ImageGrid = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ContentLoader
      width={1200}
      height={1200}
      viewBox="0 0 800 800"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{
        left: '10px',
        top: '50px',
      }}
    >
      <rect x="24" y="12" rx="2" ry="2" width="140" height="10" />
      <rect x="24" y="62" rx="2" ry="2" width="240" height="35" />
      <rect x="24" y="105" rx="2" ry="2" width="45" height="15" />
      <rect x="24" y="155" rx="2" ry="2" width="70" height="30" />
      <rect x="104" y="155" rx="2" ry="2" width="70" height="30" />
      <rect x="24" y="200" rx="2" ry="2" width="180" height="506" />
      <rect x="214" y="200" rx="2" ry="2" width="180" height="506" />
      <rect x="404" y="200" rx="2" ry="2" width="180" height="506" />
      <rect x="594" y="200" rx="2" ry="2" width="180" height="506" />
    </ContentLoader>
  </div>
);

export default ImageGrid;
