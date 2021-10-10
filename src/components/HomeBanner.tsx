import { Link } from 'react-router-dom';

import { REGISTER_ROUTE } from '../constants/ROUTE_NAME';
import Banner from '../images/banner1.svg';
const HomeBanner = () => {
  return (
    <div className="home-banner">
      <div className="container">
        <div className="banner-title">
          <h1>
            <b>Manage your store and stock</b>
          </h1>
          <p>
            Have all your goods in one place, communicate in real time with sales managers and have
            access to real time daily sales
          </p>
          <Link to={REGISTER_ROUTE}>Start For Free</Link>
        </div>
        <div className="banner-image">
          <img src={Banner} />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
