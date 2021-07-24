import { message } from 'antd';

export const showMessage = (type: string, content: string, duration: number) => {
  switch (type) {
    case 'error':
      message.error(content, duration);
      break;
    case 'warning':
      message.warning(content, duration);
      break;
    case 'success':
      message.success(content, duration);
      break;
  }
};
