export type GenderType = 'MALE' | 'FEMALE';
export type RoleType = 'SALE MANAGER' | 'ADMIN';

export type ActionType = {
  IN_PROGRESS: string;
  SUCCESS: string;
  FAILURE: string;
};

export type SignupType = {
  name: string;
  email: string;
  storeName: string;
  password: string;
  confirmPassword: string;
};

export type SigninType = {
  email: string;
  password: string;
};

export type ApiResponseType = { type: string; response: any };
export type AuthType = {
  accessToken: string;
  email: string;
  role: RoleType | string;
  loggedIn: boolean;
  id: string;
  saleManager?: SaleManagerType;
};

export type UserType = {
  id: string;
  email: string;
  role: RoleType | string;
};

export type StoreType = {
  name: string;
  industry: string;
  address: string;
  defaultPassword: string;
  logoPath?: string;
  id?: string;
  user?: UserType;
};

export type SaleManagerType = {
  id?: string;
  firstname: string;
  lastname: string;
  othernames?: string;
  address?: string;
  dob: Date | string;
  email: string;
  password?: string;
  gender: GenderType | string;
  store?: StoreType;
  user?: UserType;
  active?: boolean;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ProductType = {
  id?: string;
  imagePath?: string | File;
  name: string;
  description?: string;
  costPrice: number;
  sellingPrice: number;
  quantity: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SaleType = {
  soldAt: number;
  quantity: number;
  product?: string | ProductType;
  saleManager?: SaleManagerType;
  date?: Date;
  createdAt?: Date;
  id?: string;
};

export type ChatType = {
  id?: string;
  from: string;
  to: string;
  message: string;
};

export type RootStateType = {
  loader: ApiResponseType[];
  auth: AuthType;
  store: { data: StoreType };
  products: { data: ProductType[]; loaded: boolean; count: number };
  saleManagers: { data: SaleManagerType[]; loaded: boolean; count: number };
  chats: { data: ChatType[]; loaded: boolean; count: number };
  sales: { data: SaleType[]; liveData: SaleType[]; loaded: boolean; count: number };
};
