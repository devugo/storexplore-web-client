import { TOGGLE_CHAT_LIST, TOGGLE_EMOJI_DRAWER, TOGGLE_PROFILE, TOGGLE_SIDEBAR } from './types';

export const toggleSidebar = (value: boolean) => {
  return {
    type: TOGGLE_SIDEBAR,
    api: null,
    data: { sidebar: value },
  };
};

export const toggleChatList = (value: boolean) => {
  return {
    type: TOGGLE_CHAT_LIST,
    api: null,
    data: { chatList: value },
  };
};

export const toggleProfile = (value: boolean) => {
  return {
    type: TOGGLE_PROFILE,
    api: null,
    data: { profile: value },
  };
};

export const toggleEmojiDrawer = (value: boolean) => {
  return {
    type: TOGGLE_EMOJI_DRAWER,
    api: null,
    data: { emojiDrawer: value },
  };
};
