import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { CreateProductDTO } from './dtos/create-product.dto'
import { ProductService } from './product.service'

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from '../auth/enums/role.enum'
import { RolesGuard } from '../auth/guards/roles.guard'
@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  async getProducts() {
    const allProducts = await this.productService.getAllProducts();
    return allProducts;
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) {
      throw new NotFoundException('Product does not exist!');
    }
    return product;
  }

  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async addProduct(@Body() body: CreateProductDTO) {
    const { name, description, price, category, image_url, size } = body;

    const product = await this.productService.addProduct({
      name,
      description,
      price,
      category,
      image_url,
      size,
      quantity: 0,
    });

    return product;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const product = await this.productService.updateProduct(
      id,
      createProductDTO,
    );

    // if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}
