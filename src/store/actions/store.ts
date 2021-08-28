import { StoreType } from '../../types.d';
import { CREATE_STORE, GET_MY_STORE, UPDATE_STORE } from './types';

export const getMyStore = () => {
  const url = 'stores/mine';
  return {
    type: GET_MY_STORE,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};

export const createStore = (formData: StoreType) => {
  const url = 'stores';
  return {
    type: CREATE_STORE,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};

export const updateStore = (formData: StoreType, id: string) => {
  const url = `stores/${id}`;
  return {
    type: UPDATE_STORE,
    url,
    api: (apiClient: any) => apiClient.patch(url, formData),
  };
};
