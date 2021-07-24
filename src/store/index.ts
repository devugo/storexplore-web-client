import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { middleware } from './middleware';
import { reducer } from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
