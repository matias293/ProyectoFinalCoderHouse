import { TypeModel } from './TipoPersistencia';
import Config from '../config/index';
import { NewOrden, Orden } from '../models/ordenes/orden.interface';
import { OrdenFactoryDAO } from '../models/ordenes/ordenes.factory';

const tipo = TypeModel.get(Config.ENVIROMENT);

class ordenAPI {
  private ordenes;

  constructor() {
    this.ordenes = OrdenFactoryDAO.get(tipo);
  }

  async createOrden(orderData: NewOrden): Promise<Orden> {
    return await this.ordenes.createOrden(orderData);
  }

  async getOrden(idUser: string, idOrden: string): Promise<Orden> {
    return await this.ordenes.getOrden(idUser, idOrden);
  }

  async getOrdenes(idUser: string): Promise<Orden[]> {
    return await this.ordenes.getOrdenes(idUser);
  }

  async postOrden(idUser: string, orderId: string) {
    return await this.ordenes.postOrdenes(idUser, orderId);
  }
}

export const ordenesAPI = new ordenAPI();
