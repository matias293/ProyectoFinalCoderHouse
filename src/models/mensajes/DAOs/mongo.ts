import { Schema, model } from 'mongoose';

import MensajeDto from '../DTO/mensaje';

import { Mensaje, newMensaje, MensajesDTO, Error } from '../mensajes.intefaces';
import { MyMongoClient } from '../../../services/dbMongo';

const messageSchema = new Schema({
  userId: { type: String },
  mensaje: { type: String },
  tipo: { type: String, emun: ['USUARIO', 'SISTEMA'] },
});

messageSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};
export const MensajeModel = model('Mensaje', messageSchema);
export class MensajesAtlasDAO {
  client: MyMongoClient;
  private mensajes: any;

  constructor(local: boolean = false) {
    this.client = new MyMongoClient();
    this.client.connect(local);
    this.mensajes = model('Mensaje', messageSchema);
  }

  async get(userId: string): Promise<MensajesDTO[]> {
    let mensajesDTO: MensajesDTO[];

    let mensajes = await this.mensajes.find({ userId });
    if (mensajes.length > 0) {
      mensajesDTO = mensajes.map(
        (msg: Mensaje) => new MensajeDto(msg.mensaje, msg.tipo),
      );
      mensajes = mensajesDTO;
    }

    return mensajes as any as MensajesDTO[];
  }

  async add(messageData: newMensaje): Promise<void> {
    const nuevoMensaje = new this.mensajes(messageData);
    await nuevoMensaje.save();
    return nuevoMensaje;
  }
}
