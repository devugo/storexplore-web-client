import { ApiResponseType } from '../../types.d';

export const renderServerError = (messageObj: ApiResponseType): string => {
  const message = messageObj?.response?.data?.message as string | string[];
  if (typeof message === 'string') {
    return message;
  } else if (typeof message === 'object') {
    return message[0];
  }
  return '';
};
