const HomeFeature = ({
  first,
  mainTitle,
  secTitle,
  image,
}: {
  first: string;
  mainTitle: string;
  secTitle: string;
  image: any;
}) => {
  return (
    <div className="home-feature">
      <div className="container">
        <div className={`title${first === 'title' ? ' first' : ' second'}`}>
          <h3>{mainTitle}</h3>
          <p>{secTitle}</p>
        </div>
        <div className={`image${first === 'image' ? ' first' : ' second'}`}>
          <img src={image} />
        </div>
      </div>
    </div>
  );
};

export default HomeFeature;
