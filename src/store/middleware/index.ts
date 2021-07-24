import thunk from 'redux-thunk';

import apiMiddleware from './api';

export const middleware = [thunk, apiMiddleware];
