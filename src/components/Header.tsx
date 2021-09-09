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
            <RenderIcon title="mdi mdi-account" />

            {openProfile && (
              <div className="profile-dropdown">
                <ul>
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Logout</a>
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
