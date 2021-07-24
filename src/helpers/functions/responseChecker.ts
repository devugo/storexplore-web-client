import { ApiResponseType } from '../../types.d';

export const successCreation = (data: ApiResponseType): boolean => {
  return data?.response?.status === 201;
};

export const successUpdate = (data: ApiResponseType): boolean => {
  return data?.response?.status === 200;
};

export const successDelete = (data: ApiResponseType): boolean => {
  return data?.response?.status === 200;
};
