import Logo from '../images/logo.png';

const PageLoader = () => {
  return (
    <div className="page-loader">
      <img src={Logo} />
      <div className="page-loader__dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default PageLoader;
