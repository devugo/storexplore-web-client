import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { ROLES } from '../../constants/ROLES';

const entityState = {
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
    role: ROLES.SALE_MANAGER,
  },
  entity: { ...entityState },
};
