import { Link } from 'react-router-dom';

import { REGISTER_ROUTE } from '../constants/ROUTE_NAME';

const HomeMiddleSection = () => {
  return (
    <div className="home-middle-section">
      <div className="container">
        <h4>Manage your store better</h4>
        <p>No hassle | Ease of use | All sales in one place</p>
        <Link to={REGISTER_ROUTE}>Begin your journey</Link>
      </div>
    </div>
  );
};

export default HomeMiddleSection;
