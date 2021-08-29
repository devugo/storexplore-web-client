import { combineReducers } from 'redux';

import authReducer from './auth';
import loaderReducer from './loader';
import productReducer from './product';
import saleManagerReducer from './sale-manager';
import storeReducer from './store';

export const reducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  store: storeReducer,
  saleManagers: saleManagerReducer,
  products: productReducer,
});
