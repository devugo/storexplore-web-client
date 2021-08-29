import { showMessage } from './showMessage';

export const validateImage = (file: File) => {
  const fileType = file.type;

  const isFileValid = ['image/png', 'image/jpg', 'image/jpeg'].includes(fileType);
  if (!isFileValid) {
    showMessage('error', 'Please, upload a valid image', 4);
    return false;
  }
  return true;
};
