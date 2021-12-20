import { Request, Response, NextFunction } from 'express';

import { productsAPI } from '../apis/products';
import { Error, newProductU } from '../models/productos/products.interfaces';
import logger from '../services/logger';
import { schemaAddProduct, schemaUpdateProduct } from '../helpers/validators';

class Producto {
  //Chequa si el productoi existe
  async checkProductExists(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const producto = await productsAPI.getProducts(id);

      if (producto.length === 0) {
        const error: Error = new Error(`Product doesn't exist`);
        error.statusCode = 404;
        throw error;
      }
      next();
    } catch (err: any) {
      logger.error(err);
      next(err);
    }
  }

  //Obtiene todos los productos
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      let data = await productsAPI.getProducts();
      if (data.length === 0) return res.status(404).json(data);
      return res.json(data);
    } catch (err: any) {
      logger.error(err);
      next(err);
    }
  }

  //Obtiene un producto por la categoria seleccionada
  async getProductByCategory(req: Request, res: Response, next: NextFunction) {
    const { categoria } = req.params;
    try {
      if (!categoria || typeof categoria !== 'string') {
        const error: Error = new Error(
          'Please insert a category or a valid category',
        );
        error.statusCode = 400;
        throw error;
      }
      const producto = await productsAPI.query({
        categoria: categoria.toLowerCase(),
      });
      if (producto.length === 0) return res.status(404).json(producto);
      return res.json(producto);
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }

  //Agrega un producto
  async addProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await schemaAddProduct.validateAsync(req.body);

      const newProduct = {
        nombre: result.nombre,
        precio: result.precio,
        descripcion: result.descripcion,
        codigo: result.codigo,
        categoria: result.categoria.toLowerCase(),
        fotos: [],
        stock: result.stock,
      };
      const product = await productsAPI.addProduct(newProduct);

      res.status(201).json({
        msg: 'Producto agregado con exito',
        data: product,
      });
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;

      logger.error(err);
      next(err);
    }
  }

  //Actualiza un producto
  async updateProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      if (!id) {
        const error: Error = new Error('Please insert an id');
        error.statusCode = 400;
        throw error;
      }
      const result = await schemaUpdateProduct.validateAsync(req.body);
      if (Object.keys(result).length === 0) {
        const error: Error = new Error('Please insert some body');
        error.statusCode = 400;
        throw error;
      }

      let updateProduct: newProductU = {};

      if (result.nombre) updateProduct.nombre = result.nombre;
      if (result.precio) updateProduct.precio = result.precio;
      if (result.categoria) updateProduct.categoria = result.categoria;
      if (result.descripcion) updateProduct.descripcion = result.descripcion;
      if (result.stock) updateProduct.stock = result.stock;

      const updatedItem = await productsAPI.updateProduct(id, updateProduct);

      res.json({
        msg: 'Producto actualizado con exito  ',
        data: updatedItem,
      });
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      logger.error(err);
      next(err);
    }
  }

  //Elimina un producto
  async deleteProducts(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;

    try {
      if (!id) {
        const error: Error = new Error('Please insert an id');
        error.statusCode = 400;
        throw error;
      }
      await productsAPI.deleteProduct(id);
      res.status(200).json({
        msg: 'Producto borrado',
      });
    } catch (err: any) {
      logger.error(err);
      next(err);
    }
  }
}

export const productsController = new Producto();
