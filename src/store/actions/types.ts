import { ACTION_NAME } from '../../constants/ACTION_NAME';
import { ACTION_STATUS } from '../../constants/ACTION_STATUS';
import { ActionType } from '../../types.d';

const compose = (action: string): ActionType => {
  return {
    IN_PROGRESS: `${ACTION_STATUS.IN_PROGRESS}@${action}`,
    SUCCESS: `${ACTION_STATUS.SUCCESS}@${action}`,
    FAILURE: `${ACTION_STATUS.FAILURE}@${action}`,
  };
};

const SIGNUP_USER = compose(ACTION_NAME.SIGNUP_USER);
const SIGNIN_USER = compose(ACTION_NAME.SIGNIN_USER);
const KEEP_AUTH_USER = compose(ACTION_NAME.KEEP_AUTH_USER);
const SIGNOUT_USER = compose(ACTION_NAME.SIGNOUT_USER);

const GET_MY_STORE = compose(ACTION_NAME.GET_MY_STORE);
const CREATE_STORE = compose(ACTION_NAME.CREATE_STORE);
const UPDATE_STORE = compose(ACTION_NAME.UPDATE_STORE);

export {
  CREATE_STORE,
  GET_MY_STORE,
  KEEP_AUTH_USER,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  UPDATE_STORE,
};
