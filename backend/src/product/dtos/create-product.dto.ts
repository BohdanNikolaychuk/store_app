export class CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  quantity: number;
  size: Array<{ size: number }>;
}
