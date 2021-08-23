import { BrowserRouter as Router, Switch } from 'react-router-dom';

import SuccessMessages from './components/SuccessMessages';
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SALE_MANAGER_ADD_SALE_ROUTE,
  SALE_MANAGER_CHATS_ROUTE,
  SALE_MANAGER_EDIT_PROFILE_ROUTE,
  SALE_MANAGER_PROFILE_ROUTE,
  SALE_MANAGER_VIEW_PRODUCT_ROUTE,
  STORE_OWNER_ADD_PRODUCT_ROUTE,
  STORE_OWNER_ADD_SALE_MANAGER_ROUTE,
  STORE_OWNER_CHATS_ROUTE,
  STORE_OWNER_EDIT_PRODUCT_ROUTE,
  STORE_OWNER_EDIT_SALE_MANAGER_ROUTE,
  STORE_OWNER_SALE_MANAGERS_ROUTE,
  STORE_OWNER_SETTINGS_ROUTE,
  STORE_OWNER_VIEW_PRODUCT_ROUTE,
  STORE_OWNER_VIEW_SALE_MANAGER_ROUTE,
} from './constants/ROUTE_NAMES';
import Auth from './interceptors/Auth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import AddSale from './pages/sale-manager/AddSale';
import SaleManagerChats from './pages/sale-manager/Chats';
import EditProfile from './pages/sale-manager/EditProfile';
import Profile from './pages/sale-manager/Profile';
import SaleManagerViewProduct from './pages/sale-manager/ViewProduct';
import AddProduct from './pages/store-owner/AddProduct';
import AddSaleManager from './pages/store-owner/AddSaleManager';
import OwnerChats from './pages/store-owner/Chats';
import EditProduct from './pages/store-owner/EditProduct';
import EditSaleManager from './pages/store-owner/EditSaleManager';
import SaleManagers from './pages/store-owner/SaleManagers';
import Settings from './pages/store-owner/Settings';
import OwnerViewProduct from './pages/store-owner/ViewProduct';
import OwnerViewSaleManager from './pages/store-owner/ViewSaleManager';

const App = () => {
  return (
    <Router>
      <SuccessMessages />
      <Switch>
        <Auth isAuth={false} exact path={LOGIN_ROUTE} component={Login} />
        <Auth isAuth={false} exact path={REGISTER_ROUTE} component={Register} />
        <Auth isAuth={false} exact path="/dashboard" component={Dashboard} />

        {/* Store Ownere routes */}
        <Auth isAuth={false} exact path={STORE_OWNER_SETTINGS_ROUTE} component={Settings} />
        <Auth
          isAuth={false}
          exact
          path={STORE_OWNER_SALE_MANAGERS_ROUTE}
          component={SaleManagers}
        />
        <Auth
          isAuth={false}
          exact
          path={STORE_OWNER_EDIT_SALE_MANAGER_ROUTE}
          component={EditSaleManager}
        />
        <Auth
          isAuth={false}
          exact
          path={STORE_OWNER_ADD_SALE_MANAGER_ROUTE}
          component={AddSaleManager}
        />
        <Auth
          isAuth={false}
          exact
          path={STORE_OWNER_VIEW_SALE_MANAGER_ROUTE}
          component={OwnerViewSaleManager}
        />
        <Auth isAuth={false} exact path={STORE_OWNER_CHATS_ROUTE} component={OwnerChats} />
        <Auth isAuth={false} exact path={STORE_OWNER_ADD_PRODUCT_ROUTE} component={AddProduct} />
        <Auth isAuth={false} exact path={STORE_OWNER_EDIT_PRODUCT_ROUTE} component={EditProduct} />
        <Auth
          isAuth={false}
          exact
          path={STORE_OWNER_VIEW_PRODUCT_ROUTE}
          component={OwnerViewProduct}
        />

        {/* Sale Manager */}
        <Auth isAuth={false} exact path={SALE_MANAGER_PROFILE_ROUTE} component={Profile} />
        <Auth isAuth={false} exact path={SALE_MANAGER_EDIT_PROFILE_ROUTE} component={EditProfile} />
        <Auth isAuth={false} exact path={SALE_MANAGER_CHATS_ROUTE} component={SaleManagerChats} />
        <Auth
          isAuth={false}
          exact
          path={SALE_MANAGER_VIEW_PRODUCT_ROUTE}
          component={SaleManagerViewProduct}
        />
        <Auth isAuth={false} exact path={SALE_MANAGER_ADD_SALE_ROUTE} component={AddSale} />
      </Switch>
    </Router>
  );
};

export default App;
