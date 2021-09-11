import { ActionType, ApiResponseType } from '../../types.d';

const getProgressState = (loaders: ApiResponseType[], action: ActionType): boolean => {
  const progressData = loaders.find((x) => x.type === action.IN_PROGRESS) as ApiResponseType;
  return !!progressData;
};

const getFailureState = (loaders: ApiResponseType[], action: ActionType): ApiResponseType => {
  return loaders.find((x) => x.type === action.FAILURE) as ApiResponseType;
};

export { getFailureState, getProgressState };
