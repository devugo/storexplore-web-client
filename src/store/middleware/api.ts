import axios from 'axios';

import { STORAGE_VARIABLE } from '../../constants/STORAGE_VARIABLE';
import { retrieveFromStorage } from '../../helpers/functions/localStorage';
import { ActionType } from '../../types.d';

type ActionObject = {
  type: ActionType;
  api: (client: any) => {};
  url: string;
};

const apiMiddleware = (store: any) => (next: any) => async (action: ActionObject) => {
  const GET_TOKEN = retrieveFromStorage(STORAGE_VARIABLE.token);

  const axiosClient: any = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: { Authorization: `Bearer ${GET_TOKEN}` },
  });
  const { api, type, url } = action;
  if (!url) {
    next({ type: type.SUCCESS, response: null });
  } else {
    next({ type: type.IN_PROGRESS, response: null });

    const promise = api(axiosClient) as any;
    promise
      .then((response: any) => {
        console.log({ response });
        next({ type: type.SUCCESS, response: response });
      })
      .catch((error: any) => {
        console.log({ message: error.message });
        next({ type: type.FAILURE, response: error.response });
      });
  }
};

export default apiMiddleware;
