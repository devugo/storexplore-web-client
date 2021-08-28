import { combineReducers } from 'redux';

import authReducer from './auth';
import loaderReducer from './loader';
import storeReducer from './store';

export const reducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  store: storeReducer,
});
