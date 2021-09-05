import { updateStoreHelper } from '../../helpers/functions/updateStoreHelper';
import { ApiResponseType } from '../../types.d';
import {
  CREATE_SALE_MANAGER,
  READ_SALE_MANAGERS,
  UPDATE_STATUS_SALE_MANAGER,
} from '../actions/types';
import { DEFAULT_STATE, EntityStateType } from './defaultState';

const initialState = DEFAULT_STATE.saleManagers;

const saleManagerReducer = (state = initialState, action: ApiResponseType): EntityStateType => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case READ_SALE_MANAGERS.SUCCESS: {
      const responseData = response.data;
      return {
        ...currentState,
        data: [...responseData.saleManagers],
        count: responseData.count,
        loaded: true,
      };
    }
    case CREATE_SALE_MANAGER.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, data: [...currentState.data, { ...responseData }] };
    }
    case UPDATE_STATUS_SALE_MANAGER.SUCCESS: {
      const responseData = response.data;
      return updateStoreHelper(currentState, responseData);
    }
    default: {
      return state;
    }
  }
};

export default saleManagerReducer;
