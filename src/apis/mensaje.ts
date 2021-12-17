import { MensajesFactoryDAO } from '../models/mensajes/mensajes.factory';

import Config from '../config/index';
import { newMensaje, MensajesDTO } from '../models/mensajes/mensajes.intefaces';

import { TypeModel } from './TipoPersistencia';

const tipo = TypeModel.get(Config.ENVIROMENT);

export class mensAPI {
  private mensajes;

  constructor() {
    this.mensajes = MensajesFactoryDAO.get(tipo);
  }

  async getMensajes(idUser: string): Promise<MensajesDTO[]> {
    return await this.mensajes.get(idUser);
  }

  async addMensajes(messageData: newMensaje): Promise<void> {
    return await this.mensajes.add(messageData);
  }
}
export const mensajeAPI = new mensAPI();
