import { SaleManagerType } from '../../types.d';
import { CREATE_SALE_MANAGER } from './types';

export const createSaleManager = (formData: SaleManagerType) => {
  const url = 'sale-managers';
  return {
    type: CREATE_SALE_MANAGER,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};
