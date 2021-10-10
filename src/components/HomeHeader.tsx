import { Link } from 'react-router-dom';

import { LOGIN_ROUTE, REGISTER_ROUTE } from '../constants/ROUTE_NAME';
import Logo from '../images/storexplore-logo.png';

const HomeHeader = () => {
  return (
    <div className="home-header">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="site-logo" />
          <h3>Storexplore</h3>
        </div>
        <div className="auth-links">
          <Link className="login" to={LOGIN_ROUTE}>
            Login
          </Link>
          <Link className="signup" to={REGISTER_ROUTE}>
            Try For Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
