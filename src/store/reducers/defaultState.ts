import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { ROLE } from '../../constants/ROLE';

export type EntityStateType = {
  data: any[];
  count: number;
  loaded: boolean;
};

const entityState: EntityStateType = {
  data: [],
  count: 0,
  loaded: false,
};

export const DEFAULT_STATE = {
  loaders: [],
  auth: {
    accessToken: null,
    username: EMPTY_STRING,
    email: EMPTY_STRING,
    loggedIn: false,
    role: ROLE.SALE_MANAGER,
  },
  store: {
    data: null,
  },
  saleManagers: entityState,
  products: entityState,
  chats: entityState,
  sales: { ...entityState, liveData: [] },
};
