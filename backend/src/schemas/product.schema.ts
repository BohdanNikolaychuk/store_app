import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  category: string;

  @Prop()
  image_url: string;

  @Prop()
  quantity: number;
  @Prop()
  size: Array<{ size: number }>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
