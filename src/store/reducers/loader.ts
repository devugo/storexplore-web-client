import { ACTION_STATUS } from '../../constants/ACTION_STATUS';
import { getActionDetail } from '../../helpers/functions/getActionDetail';
import { DEFAULT_STATE } from './defaultState';

const initialState = DEFAULT_STATE.loaders;

const loaderReducer = (state = initialState, action: { type: string; response: any }) => {
  const { type, response } = action;
  const actionStatus = getActionDetail(type).status;

  switch (actionStatus) {
    case ACTION_STATUS.IN_PROGRESS: {
      return [{ type, response }];
    }
    case ACTION_STATUS.SUCCESS: {
      return [{ type, response }];
    }
    case ACTION_STATUS.FAILURE: {
      return [{ type, response }];
    }
    default: {
      return state;
    }
  }
};

export default loaderReducer;
