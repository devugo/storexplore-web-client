import { ChatType } from '../../types.d';
import { ADD_CHAT } from './types';

export const addChat = (chatObj: ChatType) => {
  return {
    type: ADD_CHAT,
    api: null,
    data: chatObj,
  };
};
