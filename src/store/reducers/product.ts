import { ApiResponseType } from '../../types.d';
import { CREATE_PRODUCT, READ_PRODUCTS } from '../actions/types';
import { DEFAULT_STATE } from './defaultState';

const initialState = DEFAULT_STATE.products;

const productReducer = (state = initialState, action: ApiResponseType) => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case READ_PRODUCTS.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, data: [...responseData] };
    }
    case CREATE_PRODUCT.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, data: [...currentState.data, { ...responseData }] };
    }
    default: {
      return state;
    }
  }
};

export default productReducer;
