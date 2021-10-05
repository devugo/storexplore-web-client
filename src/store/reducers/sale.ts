import { ApiResponseType, SaleType } from '../../types.d';
import {
  ADD_SALE,
  DELETE_SALE,
  READ_SALES,
  READ_SALES_LIVE,
  READ_SALES_SUMMARY,
} from '../actions/types';
import { DEFAULT_STATE, EntityStateType } from './defaultState';

const initialState = DEFAULT_STATE.sales;

const saleReducer = (state = initialState, action: ApiResponseType): EntityStateType | any => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case READ_SALES_LIVE.SUCCESS: {
      const responseData = response.data;
      return {
        ...currentState,
        liveData: [...responseData.sales.map((x: any) => ({ ...x, new: false }))],
        loaded: true,
      };
    }
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
        liveData: [{ ...response }, ...currentState.liveData],
      };
    }
    case DELETE_SALE.SUCCESS: {
      const newData = currentState.liveData.filter((x: SaleType) => x.id !== response.id);
      if (newData) {
        return { ...currentState, liveData: newData };
      }
      return currentState;
    }
    case READ_SALES_SUMMARY.SUCCESS: {
      const responseData = response.data;
      return {
        ...currentState,
        summary: responseData,
      };
    }
    default: {
      return state;
    }
  }
};

export default saleReducer;
