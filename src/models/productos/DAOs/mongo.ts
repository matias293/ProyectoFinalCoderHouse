import mongoose, { Schema, model } from 'mongoose';

import { ProductI } from '../products.interfaces';

import { MyMongoClient } from '../../../services/dbMongo';
import {
  OptionsQuery,
  newProductI,
  ProductQuery,
  Error,
  ProductBaseClass,
  newProductU,
} from '../products.interfaces';

const productsSchema = new mongoose.Schema<newProductI>({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  fotos: [{ idImage: { type: String } }],
  stock: {
    type: Number,
    required: true,
  },
});

productsSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

export const ProductModel = mongoose.model('Productos', productsSchema);

export class ProductosAtlasDAO implements ProductBaseClass {
  client: MyMongoClient;
  productos: typeof ProductModel;

  constructor(local?: boolean) {
    //
    this.client = new MyMongoClient();
    this.client.connect(local);
    this.productos = ProductModel;
  }

  async get(id?: string): Promise<ProductI[]> {
    let output: ProductI[] = [];

    if (id) {
      const idValid = this.client.isValidId(id);
      if (!idValid) {
        const error: Error = new Error('El id no es valido de mongo');
        error.statusCode = 400;
        throw error;
      }
      const product: ProductI = await this.productos.findById(id);

      if (product) {
        output.push(product);
      }
    } else {
      const products = await this.productos.find();

      output = products as unknown as ProductI[];
    }

    return output;
  }

  async add(data: newProductI): Promise<ProductI> {
    const newProduct = new this.productos(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, newProductData: newProductU): Promise<ProductI> {
    const idValid = this.client.isValidId(id);
    if (!idValid) {
      const error: Error = new Error('El id no es valido de mongo');
      error.statusCode = 400;
      throw error;
    }
    const updateProduct = await this.productos.findByIdAndUpdate(
      id,
      newProductData,
      { new: true },
    );
    return updateProduct;
  }

  async delete(id: string) {
    const idValid = this.client.isValidId(id);
    if (!idValid) {
      const error: Error = new Error('El id no es valido de mongo');
      error.statusCode = 400;
      throw error;
    }
    await this.productos.findByIdAndDelete(id);
  }

  async query(options: OptionsQuery): Promise<ProductI[]> {
    let query: any = {};

    if (options.minStock) {
      query.stock = { $gte: options.minStock };
    }
    if (options.categoria) {
      query.categoria = options.categoria;
    }

    const productos = this.productos.find(query);

    return productos as ProductI[];
  }

  async getImage(idImage: string): Promise<ProductI[]> {
    const product = await this.productos.find({
      fotos: { $elemMatch: { idImage } },
    });

    if (product.length === 0) {
      const error: Error = new Error('There is no image with that id');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }
}
