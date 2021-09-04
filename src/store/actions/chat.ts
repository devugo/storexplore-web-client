import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { ChatType } from '../../types.d';
import { ADD_CHAT, READ_CHATS } from './types';

export const addChat = (chatObj: ChatType) => {
  return {
    type: ADD_CHAT,
    api: null,
    data: chatObj,
  };
};

export const readChats = (params: string = EMPTY_STRING) => {
  const url = `chats${params}`;
  return {
    type: READ_CHATS,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};