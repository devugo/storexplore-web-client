import { retrieveFromStorage } from '../helpers/functions/localStorage';
import { STORAGE_VARIABLE } from './STORAGE_VARIABLE';

export const GET_TOKEN = retrieveFromStorage(STORAGE_VARIABLE.token);
