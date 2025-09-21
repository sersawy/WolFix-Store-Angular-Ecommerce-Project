export interface IAuthApi {
  success: boolean;
  message: string;
  data: Data | null;
  token?: string;
}

interface Data {
  token: string;
  user: IUser;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
}
export interface IJwtPayload {
  exp: number;
  iat: number;
  data: IAccount;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  name: string;
  email: string;
  password: string;
}

export interface IUpdateProfile {
  name: String;
  email: String;
}
export interface IChangePassword {
  oldPassword: String;
  newPassword: String;
}
export interface IAccount {
  id: number;
  email: string;
  name: string;
}
