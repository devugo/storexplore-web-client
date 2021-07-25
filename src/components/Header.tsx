import { useState } from 'react';

import RenderIcon from './RenderIcon';

const Header = ({
  toggleSidebar,
  openSidebar,
}: {
  toggleSidebar: () => void;
  openSidebar: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const toggleProfile = () => {
    setOpen((prevState) => !prevState);
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
            <RenderIcon title="mdi mdi-account" />

            {open && (
              <div className="profile-dropdown">
                <ul>
                  <li>
                    <a>Profile</a>
                  </li>
                  <li>
                    <a>Settings</a>
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
