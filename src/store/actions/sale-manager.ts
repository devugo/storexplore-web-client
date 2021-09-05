import { SaleManagerType } from '../../types.d';
import { CREATE_SALE_MANAGER, READ_SALE_MANAGERS, UPDATE_STATUS_SALE_MANAGER } from './types';

export const createSaleManager = (formData: SaleManagerType) => {
  const url = 'sale-managers';
  return {
    type: CREATE_SALE_MANAGER,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};

export const readSaleManagers = () => {
  const url = 'sale-managers';
  return {
    type: READ_SALE_MANAGERS,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};

export const updateStatusSaleManager = (formData: { active: boolean }, id: string) => {
  const url = `sale-managers/activate/${id}`;
  return {
    type: UPDATE_STATUS_SALE_MANAGER,
    url,
    api: (apiClient: any) => apiClient.patch(url, formData),
  };
};
