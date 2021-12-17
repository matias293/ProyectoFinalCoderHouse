import {
  newProductI,
  newProductU,
} from '../models/productos/products.interfaces';
import { NoticiasFactoryDAO } from '../models/productos/products.factory';

import { ProductQuery } from '../models/productos/products.interfaces';
import Config from '../config/index';
import { TypeModel } from './TipoPersistencia';

const tipo = TypeModel.get(Config.ENVIROMENT);

class prodAPI {
  private productos;

  constructor() {
    this.productos = NoticiasFactoryDAO.get(tipo);
  }

  async getProducts(id?: string) {
    if (id) {
      const product = await this.productos.get(id);

      return product;
    }

    const productos = await this.productos.get();

    return productos;
  }

  async addProduct(productData: newProductI) {
    const newProduct = await this.productos.add(productData);
    return newProduct;
  }

  async updateProduct(id: string, productData: newProductU) {
    const updatedProduct = await this.productos.update(id, productData);
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    return await this.productos.delete(id);
  }

  async query(options: ProductQuery) {
    return await this.productos.query(options);
  }

  async image(idImage: string) {
    return await this.productos.getImage(idImage);
  }
}

export const productsAPI = new prodAPI();
