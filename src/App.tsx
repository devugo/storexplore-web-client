import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SuccessMessages from './components/SuccessMessages';
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SALE_MANAGER_ADD_SALE_ROUTE,
  SALE_MANAGER_CHATS_ROUTE,
  SALE_MANAGER_DASHBOARD_ROUTE,
  SALE_MANAGER_EDIT_PROFILE_ROUTE,
  SALE_MANAGER_LIVE_SALES_ROUTE,
  SALE_MANAGER_PRODUCTS_ROUTE,
  SALE_MANAGER_PROFILE_ROUTE,
  SALE_MANAGER_SALES_ROUTE,
  SALE_MANAGER_VIEW_PRODUCT_ROUTE,
  STORE_OWNER_ADD_PRODUCT_ROUTE,
  STORE_OWNER_ADD_SALE_MANAGER_ROUTE,
  STORE_OWNER_CHATS_ROUTE,
  STORE_OWNER_DASHBOARD_ROUTE,
  STORE_OWNER_EDIT_PRODUCT_ROUTE,
  STORE_OWNER_EDIT_SALE_MANAGER_ROUTE,
  STORE_OWNER_LIVE_SALES_ROUTE,
  STORE_OWNER_PRODUCTS_ROUTE,
  STORE_OWNER_SALE_MANAGERS_ROUTE,
  STORE_OWNER_SALES_ROUTE,
  STORE_OWNER_STORE_ROUTE,
  STORE_OWNER_VIEW_PRODUCT_ROUTE,
  STORE_OWNER_VIEW_SALE_MANAGER_ROUTE,
} from './constants/ROUTE_NAMES';
import Admin from './interceptors/Admin';
import Auth from './interceptors/Auth';
import SaleManager from './interceptors/SaleManager';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AddSale from './pages/sale-manager/AddSale';
import SaleManagerChats from './pages/sale-manager/Chats';
import SaleManagerDashboard from './pages/sale-manager/Dashboard';
import EditProfile from './pages/sale-manager/EditProfile';
import SaleManagerLiveSales from './pages/sale-manager/LiveSales';
import SaleManagerProducts from './pages/sale-manager/Products';
import Profile from './pages/sale-manager/Profile';
import SaleManagerSales from './pages/sale-manager/Sales';
import SaleManagerViewProduct from './pages/sale-manager/ViewProduct';
import AddProduct from './pages/store-owner/AddProduct';
import AddSaleManager from './pages/store-owner/AddSaleManager';
import OwnerChats from './pages/store-owner/Chats';
import OwnerDashboard from './pages/store-owner/Dashboard';
import EditProduct from './pages/store-owner/EditProduct';
import EditSaleManager from './pages/store-owner/EditSaleManager';
import OwnerLiveSales from './pages/store-owner/LiveSales';
import OwnerProducts from './pages/store-owner/Products';
import SaleManagers from './pages/store-owner/SaleManagers';
import OwnerSales from './pages/store-owner/Sales';
import Store from './pages/store-owner/Store';
import OwnerViewProduct from './pages/store-owner/ViewProduct';
import OwnerViewSaleManager from './pages/store-owner/ViewSaleManager';

const TestComponent = () => {
  return <div>Devugo Component</div>;
};

const App = () => {
  return (
    <Router>
      <SuccessMessages />
      <Switch>
        <Auth isAuth={false} exact path={LOGIN_ROUTE} component={Login} />
        <Auth isAuth={false} exact path={REGISTER_ROUTE} component={Register} />

        <Route path="/devugo-test" component={TestComponent} />

        {/* Store Ownere routes */}
        <Admin exact path={STORE_OWNER_DASHBOARD_ROUTE} component={OwnerDashboard} />
        <Admin isAuth exact path={STORE_OWNER_STORE_ROUTE} component={Store} />
        <Admin isAuth exact path={STORE_OWNER_SALE_MANAGERS_ROUTE} component={SaleManagers} />
        <Admin
          isAuth
          exact
          path={STORE_OWNER_EDIT_SALE_MANAGER_ROUTE}
          component={EditSaleManager}
        />
        <Admin isAuth exact path={STORE_OWNER_ADD_SALE_MANAGER_ROUTE} component={AddSaleManager} />
        <Admin
          isAuth
          exact
          path={STORE_OWNER_VIEW_SALE_MANAGER_ROUTE}
          component={OwnerViewSaleManager}
        />
        <Admin isAuth exact path={STORE_OWNER_CHATS_ROUTE} component={OwnerChats} />
        <Admin isAuth exact path={STORE_OWNER_ADD_PRODUCT_ROUTE} component={AddProduct} />
        <Admin isAuth exact path={STORE_OWNER_PRODUCTS_ROUTE} component={OwnerProducts} />
        <Admin isAuth exact path={STORE_OWNER_SALES_ROUTE} component={OwnerSales} />
        <Admin isAuth exact path={STORE_OWNER_LIVE_SALES_ROUTE} component={OwnerLiveSales} />
        <Admin isAuth exact path={STORE_OWNER_EDIT_PRODUCT_ROUTE} component={EditProduct} />
        <Admin
          isAuth={false}
          exact
          path={STORE_OWNER_VIEW_PRODUCT_ROUTE}
          component={OwnerViewProduct}
        />

        {/* Sale Manager */}
        <SaleManager
          isAuth={false}
          exact
          path={SALE_MANAGER_DASHBOARD_ROUTE}
          component={SaleManagerDashboard}
        />
        <SaleManager isAuth={false} exact path={SALE_MANAGER_PROFILE_ROUTE} component={Profile} />
        <SaleManager
          isAuth={false}
          exact
          path={SALE_MANAGER_EDIT_PROFILE_ROUTE}
          component={EditProfile}
        />
        <SaleManager
          isAuth={false}
          exact
          path={SALE_MANAGER_CHATS_ROUTE}
          component={SaleManagerChats}
        />
        <SaleManager
          isAuth={false}
          exact
          path={SALE_MANAGER_VIEW_PRODUCT_ROUTE}
          component={SaleManagerViewProduct}
        />
        <SaleManager
          isAuth={false}
          exact
          path={SALE_MANAGER_PRODUCTS_ROUTE}
          component={SaleManagerProducts}
        />
        <SaleManager
          isAuth={false}
          exact
          path={SALE_MANAGER_SALES_ROUTE}
          component={SaleManagerSales}
        />
        <SaleManager
          isAuth={false}
          exact
          path={SALE_MANAGER_LIVE_SALES_ROUTE}
          component={SaleManagerLiveSales}
        />
        <SaleManager isAuth={false} exact path={SALE_MANAGER_ADD_SALE_ROUTE} component={AddSale} />
      </Switch>
    </Router>
  );
};

export default App;
