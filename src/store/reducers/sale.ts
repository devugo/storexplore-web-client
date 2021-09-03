import { ApiResponseType } from '../../types.d';
import { ADD_SALE, DELETE_SALE, READ_SALES } from '../actions/types';
import { DEFAULT_STATE, EntityStateType } from './defaultState';

const initialState = DEFAULT_STATE.sales;

const saleReducer = (state = initialState, action: ApiResponseType): EntityStateType => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case READ_SALES.SUCCESS: {
      const responseData = response.data;
      return {
        ...currentState,
        data: [...responseData.sales],
        count: responseData.count,
        loaded: true,
      };
    }
    case ADD_SALE.SUCCESS: {
      return {
        ...currentState,
        count: currentState.count + 1,
        data: [...currentState.data, { ...response }],
      };
    }
    case DELETE_SALE.SUCCESS: {
      const newData = currentState.data.filter((x) => x.id !== response.id);
      if (newData) {
        return { ...currentState, data: newData, count: currentState.count - 1 };
      }
      return currentState;
    }
    default: {
      return state;
    }
  }
};

export default saleReducer;
