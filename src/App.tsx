import { BrowserRouter as Router, Switch } from 'react-router-dom';

import SuccessMessages from './components/SuccessMessages';
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
        <Auth isAuth={false} exact path="/login" component={Login} />
        <Auth isAuth={false} exact path="/register" component={Register} />
        <Auth isAuth={false} exact path="/dashboard" component={Dashboard} />

        {/* Store Ownere routes */}
        <Auth isAuth={false} exact path="/store-owner/settings" component={Settings} />
        <Auth isAuth={false} exact path="/store-owner/sale-managers" component={SaleManagers} />
        <Auth
          isAuth={false}
          exact
          path="/store-owner/edit-sale-manager"
          component={EditSaleManager}
        />
        <Auth
          isAuth={false}
          exact
          path="/store-owner/add-sale-manager"
          component={AddSaleManager}
        />
        <Auth
          isAuth={false}
          exact
          path="/store-owner/view-sale-manager"
          component={OwnerViewSaleManager}
        />
        <Auth isAuth={false} exact path="/store-owner/chats" component={OwnerChats} />
        <Auth isAuth={false} exact path="/store-owner/add-product" component={AddProduct} />
        <Auth isAuth={false} exact path="/store-owner/edit-product" component={EditProduct} />
        <Auth isAuth={false} exact path="/store-owner/view-product" component={OwnerViewProduct} />

        {/* Sale Manager */}
        <Auth isAuth={false} exact path="/sale-manager/profile" component={Profile} />
        <Auth isAuth={false} exact path="/sale-manager/edit-profile" component={EditProfile} />
        <Auth isAuth={false} exact path="/sale-manager/chats" component={SaleManagerChats} />
        <Auth
          isAuth={false}
          exact
          path="/sale-manager/view-product"
          component={SaleManagerViewProduct}
        />
        <Auth isAuth={false} exact path="/sale-manager/add-sale" component={AddSale} />
      </Switch>
    </Router>
  );
};

export default App;
