export interface State {
  sneakers: ISneakers[];
  status: 'init' | 'loading' | 'error' | 'success';
}

export interface ISneakers {
  _id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  quantity: number;
  size?: Array<object>;
  SelectSize: string;
}
