import { ProductI } from '../productos/products.interfaces';
import { Orden } from '../ordenes/orden.interface';
import { CartI } from '../carrito/carrito.interfaces';
export interface Mensaje {
  _id: string;
  userId: string;
  mensaje: string;
  tipo: string;
}

export interface newMensaje {
  userId?: string;
  mensaje: string | ProductI[] | Orden | CartI;
  tipo: string;
}

export interface MensajesDTO {
  message: string;
  from: string;
}
