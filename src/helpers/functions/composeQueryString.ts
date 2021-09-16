import { EMPTY_STRING } from '../../constants/EMPTY_STRING';

export const composeQueryString = (obj: any) => {
  const queryString = Object.keys(obj)
    .filter((y) => obj[y] != EMPTY_STRING)
    .map((x) => (obj[x] ? `${x}=${obj[x]}` : EMPTY_STRING))
    .join('&');
  return queryString;
};
