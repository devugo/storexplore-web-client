import { ApiResponseType } from '../../types.d';
import {
  TOGGLE_CHAT_LIST,
  TOGGLE_EMOJI_DRAWER,
  TOGGLE_PROFILE,
  TOGGLE_SIDEBAR,
} from '../actions/types';
import { DEFAULT_STATE, OpenContentType } from './defaultState';

const initialState = DEFAULT_STATE.openContent;

const openContentReducer = (state = initialState, action: ApiResponseType): OpenContentType => {
  const { type, response } = action;
  const currentState = { ...state };

  switch (type) {
    case TOGGLE_SIDEBAR.SUCCESS: {
      return {
        ...currentState,
        ...response,
      };
    }
    case TOGGLE_CHAT_LIST.SUCCESS: {
      return {
        ...currentState,
        ...response,
      };
    }
    case TOGGLE_PROFILE.SUCCESS: {
      return {
        ...currentState,
        ...response,
      };
    }
    case TOGGLE_EMOJI_DRAWER.SUCCESS: {
      return {
        ...currentState,
        ...response,
      };
    }
    default: {
      return state;
    }
  }
};

export default openContentReducer;
