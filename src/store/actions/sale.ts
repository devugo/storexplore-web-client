import { EMPTY_STRING } from '../../constants/EMPTY_STRING';
import { ActionType, SaleType } from '../../types.d';
import { ADD_SALE, DELETE_SALE, READ_SALES_SUMMARY } from './types';

export const readSales = (params: string = EMPTY_STRING, type: ActionType) => {
  const url = `sales${params}`;
  return {
    type,
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

//  Socket
export const deleteSale = (formData: SaleType) => {
  return {
    type: DELETE_SALE,
    api: null,
    data: formData,
  };
};

export const readSalesSummary = (format: string) => {
  const url = `sales-summary?format=${format}`;
  return {
    type: READ_SALES_SUMMARY,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};
