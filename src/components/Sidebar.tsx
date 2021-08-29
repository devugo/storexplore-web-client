import { Link } from 'react-router-dom';

import {
  STORE_OWNER_CHATS_ROUTE,
  STORE_OWNER_DASHBOARD_ROUTE,
  STORE_OWNER_LIVE_SALES_ROUTE,
  STORE_OWNER_PRODUCTS_ROUTE,
  STORE_OWNER_SALE_MANAGERS_ROUTE,
  STORE_OWNER_SALES_ROUTE,
  STORE_OWNER_STORE_ROUTE,
} from '../constants/ROUTE_NAME';
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
                <Link to={STORE_OWNER_DASHBOARD_ROUTE}>
                  <RenderIcon title="mdi mdi-view-dashboard" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to={STORE_OWNER_LIVE_SALES_ROUTE}>
                  <RenderIcon title="mdi mdi-credit-card-wireless" />
                  <span>Live Sales</span>
                </Link>
              </li>
              <li>
                <Link to={STORE_OWNER_SALES_ROUTE}>
                  <RenderIcon title="mdi mdi-printer-pos" />
                  <span>Sales</span>
                </Link>
              </li>
              <li>
                <Link to={STORE_OWNER_PRODUCTS_ROUTE}>
                  <RenderIcon title="mdi mdi-store" />
                  <span>Store</span>
                </Link>
              </li>
              <li>
                <Link to={STORE_OWNER_SALE_MANAGERS_ROUTE}>
                  <RenderIcon title="mdi mdi-account-supervisor" />
                  <span>Sale Managers</span>
                </Link>
              </li>
              <li>
                <Link to={STORE_OWNER_CHATS_ROUTE}>
                  <RenderIcon title="mdi mdi-forum" />
                  <span>Chat</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="bottom-links">
            <ul className="nav-links">
              <li>
                <Link to={STORE_OWNER_STORE_ROUTE}>
                  <RenderIcon title="mdi mdi-cog" />
                  <span>Store</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
