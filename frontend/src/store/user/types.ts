export interface State {
  isAuth: null | boolean;
  user: null | IUser;
  token: null | string;
  status: 'init' | 'loading' | 'error' | 'success';
}
export interface IUser {
  username: string;
  roles: string[];
}
