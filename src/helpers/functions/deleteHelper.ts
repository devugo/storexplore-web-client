import { STORAGE_VARIABLE } from '../../constants/STORAGE_VARIABLE';
import { retrieveFromStorage } from './localStorage';

export const deleteHelper = (data: any[]) => {
  const idDeleted = retrieveFromStorage(STORAGE_VARIABLE.deleteID);
  if (idDeleted) {
    return data.filter((x: any) => x.id != idDeleted);
  }
  return null;
};
