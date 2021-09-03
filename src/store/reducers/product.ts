import { MINUS_ONE } from '../../constants/MINUS_ONE';
import { deleteHelper } from '../../helpers/functions/deleteHelper';
import { updateStoreHelper } from '../../helpers/functions/updateStoreHelper';
import { ApiResponseType } from '../../types.d';
import {
  ACTIVATE_PRODUCT,
  ADD_SALE,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
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
      return {
        ...currentState,
        data: [...responseData.products],
        count: responseData.count,
        loaded: true,
      };
    }
    case CREATE_PRODUCT.SUCCESS: {
      const responseData = response.data;
      return {
        ...currentState,
        count: currentState.count + 1,
        data: [...currentState.data, { ...responseData }],
      };
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
    case DELETE_PRODUCT.SUCCESS: {
      const filteredData = deleteHelper(currentState.data);
      if (filteredData) {
        return { ...currentState, data: filteredData, count: currentState.count - 1 };
      }
      return currentState;
    }
    case ADD_SALE.SUCCESS: {
      const prevData = currentState.data;
      const findIndex = prevData.findIndex((x) => x.id === response.productId);

      if (findIndex > MINUS_ONE) {
        const newData = prevData[findIndex];
        newData.quantity = newData.quantity - response.quantity;
        prevData[findIndex] = newData;

        return { ...currentState, data: prevData };
      }
      return currentState;
    }
    default: {
      return state;
    }
  }
};

export default productReducer;
