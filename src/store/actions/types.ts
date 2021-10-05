import { ACTION_NAME } from '../../constants/ACTION_NAME';
import { ACTION_STATUS } from '../../constants/ACTION_STATUS';
import { ActionType } from '../../types.d';

const compose = (action: string): ActionType => {
  return {
    IN_PROGRESS: `${ACTION_STATUS.IN_PROGRESS}@${action}`,
    SUCCESS: `${ACTION_STATUS.SUCCESS}@${action}`,
    FAILURE: `${ACTION_STATUS.FAILURE}@${action}`,
  };
};

const SIGNUP_USER = compose(ACTION_NAME.SIGNUP_USER);
const SIGNIN_USER = compose(ACTION_NAME.SIGNIN_USER);
const KEEP_AUTH_USER = compose(ACTION_NAME.KEEP_AUTH_USER);
const SIGNOUT_USER = compose(ACTION_NAME.SIGNOUT_USER);
const CHANGE_PASSWORD = compose(ACTION_NAME.CHANGE_PASSWORD);

const GET_MY_STORE = compose(ACTION_NAME.GET_MY_STORE);
const CREATE_STORE = compose(ACTION_NAME.CREATE_STORE);
const UPDATE_STORE = compose(ACTION_NAME.UPDATE_STORE);
const UPDATE_STORE_LOGO = compose(ACTION_NAME.UPDATE_STORE_LOGO);

const CREATE_SALE_MANAGER = compose(ACTION_NAME.CREATE_SALE_MANAGER);
const UPDATE_SALE_MANAGER = compose(ACTION_NAME.UPDATE_SALE_MANAGER);
const DELETE_SALE_MANAGER = compose(ACTION_NAME.DELETE_SALE_MANAGER);
const READ_SALE_MANAGERS = compose(ACTION_NAME.READ_SALE_MANAGERS);
const READ_SALE_MANAGER = compose(ACTION_NAME.READ_SALE_MANAGER);
const UPDATE_STATUS_SALE_MANAGER = compose(ACTION_NAME.UPDATE_STATUS_SALE_MANAGER);
const UPDATE_SALE_MANAGER_PHOTO = compose(ACTION_NAME.UPDATE_SALE_MANAGER_PHOTO);

const READ_PRODUCTS = compose(ACTION_NAME.READ_PRODUCTS);
const CREATE_PRODUCT = compose(ACTION_NAME.CREATE_PRODUCT);
const DELETE_PRODUCT = compose(ACTION_NAME.DELETE_PRODUCT);
const UPDATE_PRODUCT = compose(ACTION_NAME.UPDATE_PRODUCT);
const ACTIVATE_PRODUCT = compose(ACTION_NAME.ACTIVATE_PRODUCT);
const UPDATE_PRODUCT_IMAGE = compose(ACTION_NAME.UPDATE_PRODUCT_IMAGE);

const ADD_CHAT = compose(ACTION_NAME.ADD_CHAT);
const READ_CHATS = compose(ACTION_NAME.READ_CHATS);
const READ_SALES = compose(ACTION_NAME.READ_SALES);
const MARK_CHATS_AS_READ = compose(ACTION_NAME.MARK_CHATS_AS_READ);
const READ_SALES_SUMMARY = compose(ACTION_NAME.READ_SALES_SUMMARY);

const ADD_SALE = compose(ACTION_NAME.ADD_SALE);
const DELETE_SALE = compose(ACTION_NAME.DELETE_SALE);
const READ_SALES_LIVE = compose(ACTION_NAME.READ_SALES_LIVE);

const UPDATE_STORE_OWNER = compose(ACTION_NAME.UPDATE_STORE_OWNER);
const UPDATE_STORE_OWNER_PHOTO = compose(ACTION_NAME.UPDATE_STORE_OWNER_PHOTO);

const TOGGLE_SIDEBAR = compose(ACTION_NAME.TOGGLE_SIDEBAR);
const TOGGLE_CHAT_LIST = compose(ACTION_NAME.TOGGLE_CHAT_LIST);
const TOGGLE_PROFILE = compose(ACTION_NAME.TOGGLE_PROFILE);
const TOGGLE_EMOJI_DRAWER = compose(ACTION_NAME.TOGGLE_EMOJI_DRAWER);

export {
  ACTIVATE_PRODUCT,
  ADD_CHAT,
  ADD_SALE,
  CHANGE_PASSWORD,
  CREATE_PRODUCT,
  CREATE_SALE_MANAGER,
  CREATE_STORE,
  DELETE_PRODUCT,
  DELETE_SALE,
  DELETE_SALE_MANAGER,
  GET_MY_STORE,
  KEEP_AUTH_USER,
  MARK_CHATS_AS_READ,
  READ_CHATS,
  READ_PRODUCTS,
  READ_SALE_MANAGER,
  READ_SALE_MANAGERS,
  READ_SALES,
  READ_SALES_LIVE,
  READ_SALES_SUMMARY,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  TOGGLE_CHAT_LIST,
  TOGGLE_EMOJI_DRAWER,
  TOGGLE_PROFILE,
  TOGGLE_SIDEBAR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_IMAGE,
  UPDATE_SALE_MANAGER,
  UPDATE_SALE_MANAGER_PHOTO,
  UPDATE_STATUS_SALE_MANAGER,
  UPDATE_STORE,
  UPDATE_STORE_LOGO,
  UPDATE_STORE_OWNER,
  UPDATE_STORE_OWNER_PHOTO,
};
