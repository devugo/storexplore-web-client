import { CREATE_PRODUCT, READ_PRODUCTS } from './types';

export const createProduct = (formData: FormData) => {
  const url = 'products';
  return {
    type: CREATE_PRODUCT,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};

export const readProducts = () => {
  const url = 'products';
  return {
    type: READ_PRODUCTS,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};
