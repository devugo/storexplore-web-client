import { ApiResponseType } from '../../types.d';
import { CREATE_STORE, GET_MY_STORE, UPDATE_STORE } from '../actions/types';
import { DEFAULT_STATE } from './defaultState';

const initialState = DEFAULT_STATE.store;

const storeReducer = (state = initialState, action: ApiResponseType) => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case GET_MY_STORE.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, data: responseData };
    }
    case CREATE_STORE.SUCCESS: {
      const responseData = response.data;
      return { ...state, data: responseData };
    }
    case UPDATE_STORE.SUCCESS: {
      const responseData = response.data;
      return { ...state, data: responseData };
    }
    default: {
      return state;
    }
  }
};

export default storeReducer;
