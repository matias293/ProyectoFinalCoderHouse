import * as socketio from 'socket.io';
import * as http from 'http';
import jwt from 'jsonwebtoken';

import Config from '../config/index';
import { mensajeAPI } from '../apis/mensaje';
import { UserAPI } from '../apis/users';
import { productsAPI } from '../apis/products';
import { CartAPI } from '../apis/carts';
import { ordenesAPI } from '../apis/orden';
import { UserI } from '../models/users/user.interface';
import logger from '../config/logger';

const validarJWT = async (token: string): Promise<UserI | null> => {
  try {
    const decoded: any = await jwt.verify(token, Config.JWT_SECRET_KEY);

    const usuario = await UserAPI.getUsers(decoded.id as string);
    if (!usuario) {
      return null;
    }
    return usuario;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const mensajeController = async (mensaje: string, userId?: string) => {
  if (mensaje == 'stock') {
    return await productsAPI.query({ stock: 1 });
  } else if (mensaje === 'orden') {
    const ordenes = await ordenesAPI.getOrdenes(userId as string);
    return ordenes[ordenes.length - 1];
  } else if (mensaje === 'carrito') {
    return await CartAPI.getCart(userId as string);
  }
  const message = `
  \n Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones
  \nStock: Para conocer nuestro stock actual.
  \n Orden:Para conocer la informacion de tu ultima orden
  \n Carrito:Para concer el estado actual de tu carrito
    `;
  return message;
};

export const initWsServer = (server: http.Server): void => {
  const io: socketio.Server = new socketio.Server(server);

  io.on('connection', async (socket: socketio.Socket) => {
    socket.on('new-message', async data => {
      const { mensaje, token } = data;

      const user = await validarJWT(token);
      if (user) {
        console.log('entro aca');

        await mensajeAPI.addMensajes({
          userId: user._id,
          mensaje,
          tipo: 'USUARIO',
        });
        io.emit('resp-message', {
          tipo: 'USUARIO',
          msge: mensaje,
        });

        let respuesta = await mensajeController(mensaje, user._id.toString());
        if (typeof respuesta === 'object') {
          respuesta = JSON.stringify(respuesta);
        }
        io.emit('resp-message', {
          tipo: 'SISTEMA',
          msge: respuesta,
        });

        await mensajeAPI.addMensajes({
          userId: user._id,
          mensaje: respuesta,
          tipo: 'SISTEMA',
        });
        return;
      } else {
        io.emit('err-message', {
          tipo: 'SISTEMA',
          msge: `El token ${token} ingresado no es valido`,
        });
      }
    });
  });
};
