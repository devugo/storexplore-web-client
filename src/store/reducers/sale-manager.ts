import { ApiResponseType } from '../../types.d';
import { CREATE_SALE_MANAGER } from '../actions/types';
import { DEFAULT_STATE } from './defaultState';

const initialState = DEFAULT_STATE.saleManagers;

const saleManagerReducer = (state = initialState, action: ApiResponseType) => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case CREATE_SALE_MANAGER.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, data: { ...currentState.data, responseData } };
    }
    default: {
      return state;
    }
  }
};

export default saleManagerReducer;
