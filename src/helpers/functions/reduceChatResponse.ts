import { ChatType } from '../../types.d';

export const reduceChatResponse = (chats: any): ChatType[] => {
  return chats.map((chat: any) => {
    return {
      id: chat.id,
      message: chat.message,
      from: chat.from.id,
      to: chat.to.id,
      createdAt: chat.createdAt,
      new: false,
    };
  });
};
