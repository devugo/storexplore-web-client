import { StoreOwnerType } from '../../types.d';
import { UPDATE_STORE_OWNER, UPDATE_STORE_OWNER_PHOTO } from './types';

export const updateStoreOwnerPhoto = (formData: FormData) => {
  const url = 'store-owner/avatar';
  return {
    type: UPDATE_STORE_OWNER_PHOTO,
    url,
    api: (apiClient: any) => apiClient.patch(url, formData),
  };
};

export const updateStoreOwner = (formData: StoreOwnerType) => {
  const url = 'store-owner';
  return {
    type: UPDATE_STORE_OWNER,
    url,
    api: (apiClient: any) => apiClient.patch(url, formData),
  };
};
