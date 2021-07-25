import RenderIcon from './RenderIcon';

const Sidebar = ({ openSidebar }: { openSidebar: boolean }) => {
  return (
    <div className={`sidebar${openSidebar ? ' open' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <RenderIcon title="mdi mdi-view-dashboard" />
          <span>STOREXPLORE</span>
        </div>
        <div className="navs">
          <div className="top-links">
            <ul className="nav-links">
              <li>
                <a>
                  <RenderIcon title="mdi mdi-view-dashboard" />
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a>
                  <RenderIcon title="mdi mdi-credit-card-wireless" />
                  <span>Live Sales</span>
                </a>
              </li>
              <li>
                <a>
                  <RenderIcon title="mdi mdi-printer-pos" />
                  <span>Sales</span>
                </a>
              </li>
              <li>
                <a>
                  <RenderIcon title="mdi mdi-store" />
                  <span>Store</span>
                </a>
              </li>
              <li>
                <a>
                  <RenderIcon title="mdi mdi-account-supervisor" />
                  <span>Sale Managers</span>
                </a>
              </li>
              <li>
                <a>
                  <RenderIcon title="mdi mdi-forum" />
                  <span>Chat</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="bottom-links">
            <ul className="nav-links">
              <li>
                <a>
                  <RenderIcon title="mdi mdi-cog" />
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
