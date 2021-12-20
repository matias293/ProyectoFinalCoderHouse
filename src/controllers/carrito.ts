import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

import { CartAPI } from '../apis/carts';
import { ordenesAPI } from '../apis/orden';

import { UserI } from '../models/users/user.interface';
import { Items } from '../models/ordenes/orden.interface';
import {
  ProductCartPopulate,
  productReference,
  Error,
} from '../models/carrito/carrito.interfaces';
import logger from '../services/logger';
import { EmailService } from '../services/gmail';
import { productCarrito } from '../helpers/validators';
import { productsAPI } from '../apis/products';

class Carrito {
  //obtiene el carro del usuario
  async getCarrito(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.usuario) {
        const user = req.usuario as UserI;

        const cart = await CartAPI.getCart(user._id.toString());
        if (!cart) {
          const error: Error = new Error('Cart not found');
          error.statusCode = 404;
          throw error;
        }
        return res.json({
          cart,
        });
      }
    } catch (err: any) {
      logger.error(err);
      next(err);
    }
  }

  //Finalizar compra
  async postCarrito(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.usuario) {
        const user = req.usuario as UserI;
        const { _id, nombre, email } = user;

        const carro = await CartAPI.getCartPopulate(_id.toString());

        const { products } = carro;
        if (products.length === 0) {
          const error: Error = new Error(
            'Usted no tiene productos en su carrito',
          );
          error.statusCode = 400;
          throw error;
        }
        let total: number = 0;
        let message = '';
        let items: Items[] = [];

        products.forEach((prod: ProductCartPopulate) => {
          const produc: Items = {
            quantity: prod.quantity,
            productId: prod.productId._id as productReference,
            precio: prod.productId.precio,
          };
          total = total + prod.productId.precio * prod.quantity;
          items.push(produc);
          message += `\n <br><h1>${prod.productId.nombre} - Cantidad ${prod.quantity}\n `;
        });
        const orderData = {
          userId: _id,
          total,
          items,
        };
        await ordenesAPI.createOrden(orderData);

        const subject = `Nuevo pedido de ${nombre}-${email}`;
        await EmailService.sendEmail(email, subject, message);

        await CartAPI.clearCart(carro._id);

        res.json({ message: 'Su compra se realizo correctamente' });
      }
    } catch (err: any) {
      logger.error(err);
      next(err);
    }
  }

  //Agregar una cantidad de productos al carro
  async addCarritoProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productCarrito.validateAsync(req.body);

      if (req.usuario) {
        const user = req.usuario as UserI;
        const cartId = user._id;

        const productId = await productsAPI.getProducts(result.id);
        if (productId.length === 0) {
          const error: Error = new Error('Product doesn t exist');
          error.statusCode = 400;
          throw error;
        }
        const producto = productId[0];
        if (producto.stock < result.cantidad) {
          const error: Error = new Error('There is not stock please check it');
          error.statusCode = 400;
          throw error;
        }
        const resto = producto.stock - result.cantidad;
        await productsAPI.updateProduct(result.id, { stock: resto });
        const updatedCart = await CartAPI.addProduct(
          cartId,
          result.id,
          result.cantidad,
        );

        if (updatedCart) {
          res.json({
            msg: 'Producto agregado con exito',
            data: updatedCart,
          });
        }
      }
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      logger.error(err);
      next(err);
    }
  }

  //Elimina una cantidad de productos del carro
  async deleteCarritoProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productCarrito.validateAsync(req.body);

      if (req.usuario) {
        const user = req.usuario as UserI;
        const userId = user._id;

        const productId = await productsAPI.getProducts(result.id);
        if (productId.length === 0) {
          const error: Error = new Error('Product doesn t exist');
          error.statusCode = 400;
          throw error;
        }
        const producto = productId[0];
        const carro = await CartAPI.deleteProduct(
          userId,
          result.id,
          result.cantidad,
        );
        const newStock = producto.stock + result.cantidad;

        await productsAPI.updateProduct(result.id, { stock: newStock });
        res.json({
          msg: 'Producto borrado con exito',
          carro,
        });
      }
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      logger.error(err);
      next(err);
    }
  }
}

export const carritoController = new Carrito();
