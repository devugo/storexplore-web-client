import { LoadingOutlined } from '@ant-design/icons';

const LoaderOverlay = () => {
  return (
    <div className="loader-overlay">
      <LoadingOutlined style={{ color: 'white' }} spin />
    </div>
  );
};

export default LoaderOverlay;
