export interface State {
  isAuth: null | boolean;
  user: IUser;
  loading: null | boolean;
  token: null | string;
  error: null | string;
}
export interface IUser {
  username: string;
  roles: string[];
}
