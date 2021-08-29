import { LoadingOutlined } from '@ant-design/icons';

const ContentLoader = () => {
  return (
    <div className="content-loader center">
      <LoadingOutlined style={{ fontSize: 30 }} spin />
    </div>
  );
};

export default ContentLoader;
