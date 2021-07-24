export const getActionDetail = (value: string): { name: string; status: string } => {
  const [status, name] = value.split('@', -1);

  return { name, status };
};
