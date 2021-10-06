import { reduceChatResponse } from '../../helpers/functions/reduceChatResponse';
import { ApiResponseType } from '../../types.d';
import {
  ADD_CHAT,
  MARK_ADMIN_CHATS_AS_READ,
  MARK_SALE_MANAGER_CHATS_AS_READ,
  READ_CHATS,
} from '../actions/types';
import { DEFAULT_STATE, EntityStateType } from './defaultState';

const initialState = DEFAULT_STATE.products;

const chatReducer = (state = initialState, action: ApiResponseType): EntityStateType => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case READ_CHATS.SUCCESS: {
      const responseData = response.data;
      return {
        ...currentState,
        data: [...reduceChatResponse(responseData.chats)],
        count: responseData.count,
        loaded: true,
      };
    }
    case ADD_CHAT.SUCCESS: {
      return {
        ...currentState,
        count: currentState.count + 1,
        data: [...currentState.data, { ...response }],
      };
    }
    case MARK_SALE_MANAGER_CHATS_AS_READ.SUCCESS: {
      const userId = response;
      return {
        ...currentState,
        data: [
          ...currentState.data.map((x) => {
            if (userId === x.from) {
              console.log('IDs match...');
              return {
                ...x,
                new: false,
              };
            } else {
              console.log('IDs dont match...');
              return x;
            }
          }),
        ],
      };
    }
    case MARK_ADMIN_CHATS_AS_READ.SUCCESS: {
      return {
        ...currentState,
        data: [
          ...currentState.data.map((x) => {
            if (x.new) {
              return {
                ...x,
                new: false,
              };
            } else {
              return x;
            }
          }),
        ],
      };
    }
    default: {
      return state;
    }
  }
};

export default chatReducer;
