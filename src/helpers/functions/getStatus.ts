export const getStatus = (status: boolean): string => {
  return status ? 'ACTIVE' : 'BLOCKED';
};
