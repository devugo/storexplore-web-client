export const saveToStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const retrieveFromStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const deleteFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};
