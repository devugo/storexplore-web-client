import { BrowserRouter as Router, Switch } from 'react-router-dom';

import SuccessMessages from './components/SuccessMessages';
import Auth from './interceptors/Auth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import AddSaleManager from './pages/store-owner/AddSaleManager';
import EditSaleManager from './pages/store-owner/EditSaleManager';
import SaleManagers from './pages/store-owner/SaleManagers';
import Settings from './pages/store-owner/Settings';
import ViewSaleManagerPage from './pages/store-owner/ViewSaleManager';

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
          component={ViewSaleManagerPage}
        />
      </Switch>
    </Router>
  );
};

export default App;
