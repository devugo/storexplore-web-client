import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { SaleType } from '../../types.d';
import { ADD_SALE, DELETE_SALE, READ_SALES } from './types';

export const readSales = (params: string = EMPTY_STRING) => {
  const url = `sales${params}`;
  return {
    type: READ_SALES,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};

export const addSale = (formData: SaleType) => {
  return {
    type: ADD_SALE,
    api: null,
    data: formData,
  };
};

export const deleteSale = (formData: SaleType) => {
  return {
    type: DELETE_SALE,
    api: null,
    data: formData,
  };
};
