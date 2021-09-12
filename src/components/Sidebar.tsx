import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { EMPTY_STRING } from '../constants/EMPTY_STRING';
import { ROLE } from '../constants/ROLE';
import {
  SALE_MANAGER_CHATS_ROUTE,
  SALE_MANAGER_DASHBOARD_ROUTE,
  SALE_MANAGER_LIVE_SALES_ROUTE,
  SALE_MANAGER_PRODUCTS_ROUTE,
  SALE_MANAGER_SALES_ROUTE,
  STORE_OWNER_CHATS_ROUTE,
  STORE_OWNER_DASHBOARD_ROUTE,
  STORE_OWNER_LIVE_SALES_ROUTE,
  STORE_OWNER_PRODUCTS_ROUTE,
  STORE_OWNER_SALE_MANAGERS_ROUTE,
  STORE_OWNER_SALES_ROUTE,
  STORE_OWNER_STORE_ROUTE,
} from '../constants/ROUTE_NAME';
import { RootStateType } from '../types.d';
import RenderIcon from './RenderIcon';

const Sidebar = () => {
  const location = useLocation();
  const { auth, openContent } = useSelector((state: RootStateType) => state);
  const userRole = auth.role;
  const openSidebar = openContent.sidebar;

  const getActiveNav = (routeNames: string[]): string => {
    const [firstRoute, secondRoute] = routeNames;
    const isActive =
      location.pathname.includes(firstRoute) || location.pathname.includes(secondRoute);
    return isActive ? 'active' : EMPTY_STRING;
  };

  return (
    <div className={`sidebar${openSidebar ? ' open' : EMPTY_STRING}`}>
      <div className="sidebar-content">
        <div className="sidebar-logo">
          <RenderIcon title="mdi mdi-view-dashboard" />
          <span>STOREXPLORE</span>
        </div>
        <div className="navs">
          <div className="top-links">
            <ul className="nav-links">
              <li
                className={getActiveNav([
                  SALE_MANAGER_DASHBOARD_ROUTE,
                  STORE_OWNER_DASHBOARD_ROUTE,
                ])}
              >
                <Link
                  to={
                    userRole === ROLE.SALE_MANAGER
                      ? SALE_MANAGER_DASHBOARD_ROUTE
                      : STORE_OWNER_DASHBOARD_ROUTE
                  }
                >
                  <RenderIcon title="mdi mdi-view-dashboard" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li
                className={getActiveNav([
                  SALE_MANAGER_LIVE_SALES_ROUTE,
                  STORE_OWNER_LIVE_SALES_ROUTE,
                ])}
              >
                <Link
                  to={
                    userRole === ROLE.SALE_MANAGER
                      ? SALE_MANAGER_LIVE_SALES_ROUTE
                      : STORE_OWNER_LIVE_SALES_ROUTE
                  }
                >
                  <RenderIcon title="mdi mdi-credit-card-wireless" />
                  <span>{userRole === ROLE.SALE_MANAGER ? 'Today Sales' : 'Live Sales'}</span>
                </Link>
              </li>
              <li className={getActiveNav([SALE_MANAGER_SALES_ROUTE, STORE_OWNER_SALES_ROUTE])}>
                <Link
                  to={
                    userRole === ROLE.SALE_MANAGER
                      ? SALE_MANAGER_SALES_ROUTE
                      : STORE_OWNER_SALES_ROUTE
                  }
                >
                  <RenderIcon title="mdi mdi-printer-pos" />
                  <span>Sales</span>
                </Link>
              </li>
              <li
                className={getActiveNav([SALE_MANAGER_PRODUCTS_ROUTE, STORE_OWNER_PRODUCTS_ROUTE])}
              >
                <Link
                  to={
                    userRole === ROLE.SALE_MANAGER
                      ? SALE_MANAGER_PRODUCTS_ROUTE
                      : STORE_OWNER_PRODUCTS_ROUTE
                  }
                >
                  <RenderIcon title="mdi mdi-store" />
                  <span>Products</span>
                </Link>
              </li>
              {userRole === ROLE.ADMIN && (
                <li className={getActiveNav([STORE_OWNER_SALE_MANAGERS_ROUTE])}>
                  <Link to={STORE_OWNER_SALE_MANAGERS_ROUTE}>
                    <RenderIcon title="mdi mdi-account-supervisor" />
                    <span>Sale Managers</span>
                  </Link>
                </li>
              )}
              <li className={getActiveNav([SALE_MANAGER_CHATS_ROUTE, STORE_OWNER_CHATS_ROUTE])}>
                <Link
                  to={
                    userRole === ROLE.SALE_MANAGER
                      ? SALE_MANAGER_CHATS_ROUTE
                      : STORE_OWNER_CHATS_ROUTE
                  }
                >
                  <RenderIcon title="mdi mdi-forum" />
                  <span>Chat</span>
                </Link>
              </li>
            </ul>
          </div>
          {userRole === ROLE.ADMIN && (
            <div className="bottom-links">
              <ul className="nav-links">
                <li className={getActiveNav([STORE_OWNER_STORE_ROUTE])}>
                  <Link to={STORE_OWNER_STORE_ROUTE}>
                    <RenderIcon title="mdi mdi-cog" />
                    <span>Store</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
