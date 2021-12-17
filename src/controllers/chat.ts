import { Request, Response, NextFunction } from 'express';

import logger from '../config/logger';
import { mensajeAPI } from '../apis/mensaje';
import { Error } from '../models/error.interface';

class Mensaje {
  async getChatNew(req: Request, res: Response, next: NextFunction) {
    res.render('chat', { pageTitle: 'CHAT' });
  }

  async getHistorialChat(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.usuario) {
        const user = req.usuario;
        const mensajes = await mensajeAPI.getMensajes(user._id.toString());
        if (mensajes.length === 0) {
          const error: Error = new Error('No hay mensajes guardados');
          error.statusCode = 404;
          throw error;
        }
        res.json(mensajes);
      }
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
}

export const chatController = new Mensaje();
