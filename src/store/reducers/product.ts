import { updateStoreHelper } from '../../helpers/functions/updateStoreHelper';
import { ApiResponseType } from '../../types.d';
import {
  ACTIVATE_PRODUCT,
  CREATE_PRODUCT,
  READ_PRODUCTS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_IMAGE,
} from '../actions/types';
import { DEFAULT_STATE, EntityStateType } from './defaultState';

const initialState = DEFAULT_STATE.products;

const productReducer = (state = initialState, action: ApiResponseType): EntityStateType => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case READ_PRODUCTS.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, data: [...responseData], loaded: true };
    }
    case CREATE_PRODUCT.SUCCESS: {
      const responseData = response.data;
      return { ...currentState, data: [...currentState.data, { ...responseData }] };
    }
    case UPDATE_PRODUCT.SUCCESS: {
      const responseData = response.data;
      return updateStoreHelper(currentState, responseData);
    }
    case UPDATE_PRODUCT_IMAGE.SUCCESS: {
      const responseData = response.data;
      return updateStoreHelper(currentState, responseData);
    }
    case ACTIVATE_PRODUCT.SUCCESS: {
      const responseData = response.data;
      return updateStoreHelper(currentState, responseData);
    }
    default: {
      return state;
    }
  }
};

export default productReducer;
