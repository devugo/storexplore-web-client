import { reduceChatResponse } from '../../helpers/functions/reduceChatResponse';
import { ApiResponseType } from '../../types.d';
import { ADD_CHAT, READ_CHATS } from '../actions/types';
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
    default: {
      return state;
    }
  }
};

export default chatReducer;
