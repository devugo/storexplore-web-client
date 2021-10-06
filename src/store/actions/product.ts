import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { ProductType } from '../../types.d';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  READ_PRODUCTS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_IMAGE,
} from './types';

export const createProduct = (formData: FormData) => {
  const url = 'products';
  return {
    type: CREATE_PRODUCT,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};

export const updateProduct = (formData: ProductType, id: string) => {
  const url = `products/${id}`;
  return {
    type: UPDATE_PRODUCT,
    url,
    api: (apiClient: any) => apiClient.patch(url, formData),
  };
};

export const updateProductImage = (formData: FormData, id: string) => {
  const url = `products/image/${id}`;
  return {
    type: UPDATE_PRODUCT_IMAGE,
    url,
    api: (apiClient: any) => apiClient.patch(url, formData),
  };
};

export const readProducts = (params: string = EMPTY_STRING) => {
  const url = `products${params}`;
  return {
    type: READ_PRODUCTS,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};

export const deleteProduct = (id: string) => {
  const url = `products/${id}`;
  return {
    type: DELETE_PRODUCT,
    url,
    api: (apiClient: any) => apiClient.delete(url),
  };
};
