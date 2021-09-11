import { ActionType, ApiResponseType } from '../../types.d';
import { getLoader } from './getLoader';

export const getLoaderState = (loaders: ApiResponseType[], action: ActionType): any => {
  const { successData, errorData, progressData } = getLoader(loaders, action);
  return { inProgress: !!progressData, successData, errorData };
};
