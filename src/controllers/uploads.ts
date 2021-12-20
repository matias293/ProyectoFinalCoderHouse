import { Request, Response, NextFunction } from 'express';

import logger from '../services/logger';
import { productsAPI } from '../apis/products';
import { Error } from '../models/productos/products.interfaces';
import { deleteFile } from '../util/file';
interface MulterRequest extends Request {
  file: any;
}

class Image {
  //Agrega una imagen al producto
  async postImage(req: Request, res: Response, next: NextFunction) {
    const { productId } = req.body;
    const foto = (req as MulterRequest).file;
    try {
      if (!productId) {
        const error: Error = new Error('Ingresar id valido');
        error.statusCode = 400;
        throw error;
      }

      if (!foto) {
        const error: Error = new Error('Seleccione alguna imagen');
        error.statusCode = 422;
        throw error;
      }
      const imageUrl: string = foto.path.replace('\\', '/').split('/')[1];

      const productoId = await productsAPI.getProducts(productId);

      if (productoId.length === 0) {
        const error: Error = new Error('Product doesn t exist');
        error.statusCode = 404;
        throw error;
      }

      const producto = productoId[0];

      const updateFotos = [...producto.fotos, { idImage: imageUrl }];

      await productsAPI.updateProduct(producto._id, { fotos: updateFotos });

      return res.status(201).json({ imageUrl });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }

  //Obtiene la imagen del producto
  async getImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (!id) {
        const error: Error = new Error('Ingresar id de la imagen');
        error.statusCode = 400;
        throw error;
      }
      const producto = (await productsAPI.image(id))[0];

      const image = producto.fotos.find(prod => prod.idImage === id);
      res.json({ image: image?.idImage });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }

  //Elimina una imagen seleccionado del producto
  async deleteImage(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      if (!id) {
        const error: Error = new Error('Ingresar id de la imagen');
        error.statusCode = 400;
        throw error;
      }
      const producto = (await productsAPI.image(id))[0];
      const deletedProduct = producto.fotos.filter(prod => prod.idImage !== id);
      const path: string = 'images/' + id;
      deleteFile(path);

      await productsAPI.updateProduct(producto._id, { fotos: deletedProduct });

      res.json({ msg: 'Imagen borrada' });
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
}

export const imageController = new Image();
