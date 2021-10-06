import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { ChatType } from '../../types.d';
import {
  ADD_CHAT,
  MARK_ADMIN_CHATS_AS_READ,
  MARK_SALE_MANAGER_CHATS_AS_READ,
  READ_CHATS,
} from './types';

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

export const markSaleManagerChatsAsRead = (userId: string) => {
  return {
    type: MARK_SALE_MANAGER_CHATS_AS_READ,
    api: null,
    data: userId,
  };
};

export const markAdminChatsAsRead = () => {
  return {
    type: MARK_ADMIN_CHATS_AS_READ,
    api: null,
    data: null,
  };
};
