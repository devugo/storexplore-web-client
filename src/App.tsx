import { BrowserRouter as Router, Switch } from 'react-router-dom';

import SuccessMessages from './components/SuccessMessages';
import Auth from './interceptors/Auth';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Router>
      <SuccessMessages />
      <Switch>
        <Auth isAuth={false} exact path="/login" component={Login} />
        <Auth isAuth={false} exact path="/register" component={Register} />
        <Auth isAuth={false} exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
