import { useDispatch, useSelector } from 'react-redux';

import { ROLE } from '../constants/ROLE';
import { signOut } from '../store/actions/auth';
import { RootStateType } from '../types.d';
import RenderIcon from './RenderIcon';

const Header = ({
  toggleSidebar,
  openSidebar,
  toggleProfile,
  openProfile,
}: {
  toggleSidebar: () => void;
  openSidebar: boolean;
  toggleProfile: () => void;
  openProfile: boolean;
}) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootStateType) => state);
  console.log({ auth });

  const logUserOut = () => {
    dispatch(signOut());
  };
  return (
    <div className={`header${openSidebar ? ' sidebar-open' : ''}`}>
      <div className="header-content">
        <div className="hamburger" onClick={toggleSidebar}>
          <span className="hamburger-stick"></span>
          <span className="hamburger-stick"></span>
          <span className="hamburger-stick"></span>
        </div>
        <div className="header-right">
          <RenderIcon title="mdi mdi-bell" />
          <div className="profile" onClick={toggleProfile}>
            {/* <RenderIcon title="mdi mdi-account" /> */}
            <img src={auth.role === ROLE.SALE_MANAGER ? auth.saleManager?.photo : ''} />

            {openProfile && (
              <div className="profile-dropdown">
                <ul>
                  <li>
                    <a>Profile</a>
                  </li>
                  <li onClick={logUserOut}>
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
