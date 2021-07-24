import { combineReducers } from 'redux';

import authReducer from './auth';
import loaderReducer from './loader';

export const reducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
});
