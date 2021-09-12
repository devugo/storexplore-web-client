import { combineReducers } from 'redux';

import authReducer from './auth';
import chatReducer from './chat';
import loaderReducer from './loader';
import openContentReducer from './open-content';
import productReducer from './product';
import saleReducer from './sale';
import saleManagerReducer from './sale-manager';
import storeReducer from './store';

export const reducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  store: storeReducer,
  saleManagers: saleManagerReducer,
  products: productReducer,
  chats: chatReducer,
  sales: saleReducer,
  openContent: openContentReducer,
});
