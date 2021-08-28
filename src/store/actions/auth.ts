import { SigninType } from '../../types.d';
import { KEEP_AUTH_USER, SIGNIN_USER, SIGNOUT_USER, SIGNUP_USER } from './types';

export const signup = (formData: {
  email: string;
  password: string;
  name: string;
  storeName: string;
}) => {
  const url = 'auth/register';
  return {
    type: SIGNUP_USER,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};

export const signin = (formData: SigninType) => {
  const url = 'auth/login';
  return {
    type: SIGNIN_USER,
    url,
    api: (apiClient: any) => apiClient.post(url, formData),
  };
};

export const keepUserLoggedIn = () => {
  const url = 'auth/retain';
  return {
    type: KEEP_AUTH_USER,
    url,
    api: (apiClient: any) => apiClient.get(url),
  };
};

export const signOut = () => {
  return {
    type: SIGNOUT_USER,
  };
};
