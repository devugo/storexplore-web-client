import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import PageLoader from '../components/PageLoader';
import { ROLE } from '../constants/ROLE';
import { SALE_MANAGER_DASHBOARD_ROUTE, STORE_OWNER_DASHBOARD_ROUTE } from '../constants/ROUTE_NAME';
import { STORAGE_VARIABLE } from '../constants/STORAGE_VARIABLE';
import { getLoader } from '../helpers/functions/getLoader';
import { retrieveFromStorage } from '../helpers/functions/localStorage';
import { keepUserLoggedIn } from '../store/actions/auth';
import { KEEP_AUTH_USER } from '../store/actions/types';
import { RootStateType } from '../types.d';

const Auth = ({ component: Component, isAuth, ...rest }: any) => {
  const [mount, setMount] = useState(false);
  const dispatch = useDispatch();
  const { auth, loader } = useSelector((state: RootStateType) => state);

  const { successData, errorData } = getLoader(loader, KEEP_AUTH_USER);
  const token = retrieveFromStorage(STORAGE_VARIABLE.token);

  useEffect(() => {
    if (!auth.loggedIn) {
      if (token) {
        dispatch(keepUserLoggedIn());
      } else {
        setMount(true);
      }
    } else {
      setMount(true);
    }
  }, []);

  useEffect(() => {
    if (successData?.response?.status == 200) {
      setMount(true);
    }
    if (errorData) {
      setMount(true);
    }
  }, [successData, errorData]);

  if (isAuth) {
    return (
      <Route
        {...rest}
        render={(props) =>
          mount ? auth.loggedIn ? <Component {...props} /> : <Redirect to="/" /> : <PageLoader />
        }
      />
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        mount ? (
          auth.loggedIn ? (
            <Redirect
              to={
                auth.role === ROLE.ADMIN
                  ? STORE_OWNER_DASHBOARD_ROUTE
                  : SALE_MANAGER_DASHBOARD_ROUTE
              }
            />
          ) : (
            <Component {...props} />
          )
        ) : (
          <PageLoader />
        )
      }
    />
  );
};

export default Auth;
