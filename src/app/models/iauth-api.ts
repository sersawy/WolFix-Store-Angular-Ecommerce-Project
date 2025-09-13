export interface IAuthApi {
  success: boolean;
  message: string;
  data: Data | null;
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
  data: {
    id: number;
    email: string;
    name: string;
  };
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
