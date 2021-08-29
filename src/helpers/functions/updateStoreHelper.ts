import { MINUS_ONE } from '../../constants/MINUS_ONE';

export const updateStoreHelper = (currentState: any, responseData: any) => {
  const presentStateData = currentState.data;
  const updatedIndex = presentStateData.findIndex((data: any) => data.id === responseData.id);

  if (updatedIndex > MINUS_ONE) {
    presentStateData[updatedIndex] = responseData;
  }
  return { ...currentState, data: [...presentStateData] };
};
