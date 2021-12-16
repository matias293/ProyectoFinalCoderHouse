import mongoose, { Schema, model } from 'mongoose';
import moment from 'moment';

import { NewOrden, Orden, OrdenBaseClass } from '../orden.interface';
import { MyMongoClient } from '../../../services/dbMongo';
import { Error } from '../../error.interface';

const ordenSchema = new mongoose.Schema<Orden>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      quantity: { type: Number },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Productos',
      },
      precio: { type: Number },
    },
  ],
  timestamp: { type: String, default: moment().format('DD/MM/YYYY HH:mm:ss') },
  estado: {
    type: String,
    default: 'GENERADO',
    emun: ['GENERADO', 'PAGADO', 'ENVIANDO', 'FINALIZADO'],
  },
  total: {
    type: Number,
  },
});
ordenSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};
export const OrderModel = mongoose.model('Orden', ordenSchema);

export class OrderAtlasDAO implements OrdenBaseClass {
  client: MyMongoClient;
  private orders: typeof OrderModel;

  constructor(local: boolean = false) {
    this.client = new MyMongoClient();
    this.client.connect(local);
    this.orders = model('Orden', ordenSchema);
  }

  async createOrden(dataOrder: NewOrden): Promise<Orden> {
    const newOrden = new this.orders(dataOrder);
    await newOrden.save();
    return newOrden as any as Orden;
  }

  async getOrden(idUser: string, idOrden: string): Promise<Orden> {
    const orden = await this.orders.findOne({ userId: idUser, _id: idOrden });
    if (!orden) {
      const error: Error = new Error('Orden not found');
      error.statusCode = 404;
      throw error;
    }
    return orden as any as Orden;
  }

  async getOrdenes(idUser: string): Promise<Orden[]> {
    const ordenes = await this.orders.find({ userId: idUser });
    if (ordenes.length === 0) {
      const error: Error = new Error('The user doesn t have orders');
      error.statusCode = 404;
      throw error;
    }
    return ordenes as any as Orden[];
  }

  async postOrdenes(userId: string, orderId: string): Promise<Orden> {
    const order = await this.getOrden(userId, orderId);
    if (order.estado !== 'GENERADO') {
      const error: Error = new Error('No se encuentra en estado generada');
      error.statusCode = 400;
      throw error;
    }
    return await this.orders.findByIdAndUpdate(
      orderId,
      { estado: 'FINALIZADO' },
      { new: true },
    );
  }
}
