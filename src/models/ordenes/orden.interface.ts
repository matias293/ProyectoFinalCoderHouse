import { Schema } from 'mongoose';

export type ObjectId = Schema.Types.ObjectId | string;

export interface Items {
  quantity: number;
  productId: ObjectId;
  precio: number;
}

export interface NewOrden {
  items: Items[];
  userId: ObjectId;
  total: number;
}

export interface Orden {
  items: Items[];
  userId: ObjectId;
  timestamp: string;
  estado: string;
  total: number;
  _id?: ObjectId;
}

export interface OrdenBaseClass {
  createOrden(dataOrder: NewOrden): Promise<Orden>;
  getOrden(userId: string, idOrden: string): Promise<Orden>;
  getOrdenes(userId: string): Promise<Orden[]>;
  postOrdenes(userId: string, idOrden: string): Promise<Orden>;
}

export interface Error {
  statusCode?: number;
  message?: string;
}
