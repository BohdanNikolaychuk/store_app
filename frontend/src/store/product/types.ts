export interface State {
  sneakers: ISneakers[];
  loading: null | boolean;
  error: null | string;
}

export interface ISneakers {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image_url?: string;
}
