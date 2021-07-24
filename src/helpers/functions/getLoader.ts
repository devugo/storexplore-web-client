import { ActionType, ApiResponseType } from '../../types.d';

export const getLoader = (loader: ApiResponseType[], api: ActionType) => {
  const successData = loader.find((x) => x.type === api.SUCCESS) as ApiResponseType;
  const errorData = loader.find((x) => x.type === api.FAILURE) as ApiResponseType;
  const progressData = loader.find((x) => x.type === api.IN_PROGRESS) as ApiResponseType;

  return { successData, errorData, progressData };
};
