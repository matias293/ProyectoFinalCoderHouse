import mongoose, { Schema, model, Types } from 'mongoose';
import moment from 'moment';

import logger from '../../../config/logger';
import {
  CartI,
  CartBaseClass,
  Error,
  ProductCart,
  Direccion,
  CartIPopulate,
} from '../carrito.interfaces';

import { MyMongoClient } from '../../../services/dbMongo';

interface Carrito {
  userId: Types.ObjectId;
  products: Productos[];
  createdAt: string;
  updatedAt: string;
  direccion: Direccion;
}

interface Productos {
  productId: Types.ObjectId;
  quantity?: number;
}

const carritoSchema = new mongoose.Schema<Carrito>({
  createdAt: {
    type: String,
    default: moment().format('DD/MM/YYYY HH:mm:ss'),
  },
  updatedAt: {
    type: String,
    default: moment().format('DD/MM/YYYY HH:mm:ss'),
  },
  products: [
    {
      quantity: { type: Number },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Productos',
      },
    },
  ],
  direccion: {
    calle: {
      type: String,
      required: true,
    },
    altura: {
      type: String,
      required: true,
    },
    cp: {
      type: String,
      required: true,
    },
    piso: {
      type: Number,
    },
    departamento: {
      type: String,
    },
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

carritoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

carritoSchema.methods.clearCart = async function () {
  try {
    this.products = [];
    return await this.save();
  } catch (error) {
    logger.error(error);
  }
};

carritoSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

carritoSchema.methods.addToCart = async function (id, cantidad: number) {
  try {
    const cartProductIndex = this.products.findIndex(cp => {
      return cp.productId.toString() === id.toString();
    });
    let newQuantity = cantidad;
    const updatedCartItems = [...this.products];

    if (cartProductIndex < 0) {
      updatedCartItems.push({
        productId: id,
        quantity: newQuantity,
      });
      this.updatedAt = moment().format('DD/MM/YYYY HH:mm:ss');
      this.products = updatedCartItems;
    } else {
      newQuantity =
        (this.products[cartProductIndex].quantity as number) + newQuantity;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
      this.products = updatedCartItems;
      this.updatedAt = moment().format('DD/MM/YYYY HH:mm:ss');
    }
    await this.save();
    return this;
  } catch (error) {
    logger.error(error);
  }
};

carritoSchema.methods.removeFromCart = async function (productId) {
  try {
    const updatedCartItems = this.products.filter(item => {
      return item.productId.toString() !== productId.toString();
    });
    this.products = updatedCartItems;

    return await this.save();
  } catch (error) {
    logger.error(error);
  }
};
export const CartModel = mongoose.model('Cart', carritoSchema);

export class CartsAtlasDAO implements CartBaseClass {
  client: MyMongoClient;
  private carts: typeof CartModel;

  constructor(local: boolean = false) {
    this.client = new MyMongoClient();
    this.client.connect(local);
    this.carts = model('Carrito', carritoSchema);
  }

  async get(userId: string): Promise<CartI> {
    const cart: CartI = await this.carts.findOne({ userId });

    return cart;
  }

  async getPopulate(userId: string): Promise<CartIPopulate> {
    const cart: CartIPopulate = await this.carts
      .findOne({ userId })
      .populate('products.productId');

    if (!cart) {
      const error: Error = new Error('cart not found');
      error.statusCode = 404;
      throw error;
    }
    return cart;
  }

  async createCart(userId: string, direccion: Direccion): Promise<CartI> {
    const newCart = new this.carts({
      userId,
      products: [],
      direccion,
    });

    await newCart.save();

    return newCart;
  }

  async addProduct(userId: string, id: string, amount: number): Promise<CartI> {
    const cart = await this.carts.findOne({ userId });

    if (!cart) {
      const error: Error = new Error('Cart not found');
      error.statusCode = 400;
      throw error;
    }
    const cartUpdated = await cart.addToCart(id, amount);
    return cartUpdated;
  }

  async deleteProduct(
    userId: string,
    productId: string,
    amount: number,
  ): Promise<CartI> {
    const cart = await this.carts.findOne({ userId });

    if (!cart) {
      const error: Error = new Error('Cart not found');
      error.statusCode = 400;
      throw error;
    }

    const index = cart.products.findIndex((aProduct: ProductCart) => {
      return aProduct.productId.toString() === productId;
    });

    if (index < 0) {
      const error: Error = new Error('Product not found in the cart');
      error.statusCode = 400;
      throw error;
    }
    const amountProduct: number = cart.products[index].quantity;
    if (amountProduct <= amount) {
      const error: Error = new Error(
        `You don't have that quantity in your cart, please check it`,
      );
      error.statusCode = 400;
      throw error;
    } else {
      cart.products[index].quantity = amountProduct - amount;
    }

    await cart.save();
    return cart as CartI;
  }

  async clearCart(cartId: string) {
    const cart = await this.carts.findById(cartId);
    if (!cart) {
      const error: Error = new Error('Cart not found');
      error.statusCode = 404;
      throw error;
    }
    await cart.clearCart();
  }
}
