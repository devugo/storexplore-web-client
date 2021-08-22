export type GenderType = 'MALE' | 'FEMALE';

export type ActionType = {
  IN_PROGRESS: string;
  SUCCESS: string;
  FAILURE: string;
};

export type SignupType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SigninType = {
  email: string;
  password: string;
};

export type ApiResponseType = { type: string; response: any };
export type AuthType = { accessToken: string; username: string; email: string; loggedIn: boolean };

export type RootStateType = {
  loader: ApiResponseType[];
  auth: AuthType;
};

export type StoreType = {
  name: string;
  industry: string;
  address: string;
  defaultPassword: string;
};

export type SaleManagerType = {
  firstname: string;
  lastname: string;
  othernames?: string;
  address?: string;
  dob: Date | string;
  email: string;
  password?: string;
  gender: GenderType | string;
};

export type ProductType = {
  image?: string;
  name: string;
  description?: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
};
