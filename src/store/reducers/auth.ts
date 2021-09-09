import { GET_TOKEN } from '../../constants/GET_TOKEN';
import { STORAGE_VARIABLE } from '../../constants/STORAGE_VARIABLE';
import { deleteFromStorage, saveToStorage } from '../../helpers/functions/localStorage';
import { KEEP_AUTH_USER, READ_SALE_MANAGER, SIGNIN_USER, SIGNOUT_USER } from '../actions/types';
import { DEFAULT_STATE } from './defaultState';

const initialState = DEFAULT_STATE.auth;

const authReducer = (state = initialState, action: { type: string; response: any }) => {
  const { type, response } = action;

  switch (type) {
    case SIGNIN_USER.SUCCESS: {
      const responseData = response.data;
      saveToStorage(STORAGE_VARIABLE.token, responseData.accessToken);
      return { ...state, loggedIn: true, ...responseData };
    }

    case KEEP_AUTH_USER.SUCCESS: {
      const responseData = response.data;
      return { ...state, loggedIn: true, ...responseData, accessToken: GET_TOKEN };
    }

    case SIGNOUT_USER.SUCCESS: {
      deleteFromStorage(STORAGE_VARIABLE.token);
      deleteFromStorage(STORAGE_VARIABLE.deleteID);
      return initialState;
    }

    case READ_SALE_MANAGER.SUCCESS: {
      const responseData = response.data;
      return { ...state, saleManager: responseData };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
