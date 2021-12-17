import { CartFactoryDAO } from '../models/carrito/carrito.factory';

import {
  CartI,
  Error,
  Direccion,
  CartIPopulate,
} from '../models/carrito/carrito.interfaces';
import { UserAPI } from './users';
import { TypeModel } from './TipoPersistencia';
import Config from '../config/index';

const tipo = TypeModel.get(Config.ENVIROMENT);

class Cart {
  private carts;

  constructor() {
    this.carts = CartFactoryDAO.get(tipo);
  }

  async getCart(userId: string): Promise<CartI> {
    return this.carts.get(userId);
  }

  async getCartPopulate(userId: string): Promise<CartIPopulate> {
    return this.carts.getPopulate(userId);
  }

  async createCart(userId: string, direccion: Direccion): Promise<CartI> {
    const user = await UserAPI.getUsers(userId);

    if (!user) {
      const error: Error = new Error('User does not exist.Error creating cart');
      error.statusCode = 404;
      throw error;
    }

    const newCart = await this.carts.createCart(userId, direccion);
    return newCart;
  }

  async addProduct(
    cartId: string,
    productId: string,
    amount: number,
  ): Promise<CartI> {
    const updatedCart = await this.carts.addProduct(cartId, productId, amount);
    return updatedCart;
  }

  async deleteProduct(cartId: string, productId: string, amount: number) {
    const updatedCart = await this.carts.deleteProduct(
      cartId,
      productId,
      amount,
    );
    return updatedCart;
  }

  async clearCart(cartId: string) {
    return await this.carts.clearCart(cartId);
  }
}

export const CartAPI = new Cart();
