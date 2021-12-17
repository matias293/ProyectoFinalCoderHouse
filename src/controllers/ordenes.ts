import { Request, Response, NextFunction } from 'express';

import { ordenesAPI } from '../apis/orden';
import logger from '../config/logger';
import { EmailService } from '../services/gmail';
import { Error } from '../models/error.interface';

class Orden {
  async getOrdenes(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.usuario) {
        const usuario = req.usuario;
        const ordenes = await ordenesAPI.getOrdenes(usuario._id.toString());
        res.json(ordenes);
      }
    } catch (err: any) {
      logger.error(err);
      next(err);
    }
  }

  async getOrden(req: Request, res: Response, next: NextFunction) {
    const { orderId } = req.params;
    try {
      if (!orderId || typeof orderId !== 'string') {
        const error: Error = new Error('Please insert a valid orderId');
        error.statusCode = 400;
        throw error;
      }
      if (req.usuario) {
        const usuario = req.usuario;
        const orden = await ordenesAPI.getOrden(
          usuario._id.toString(),
          orderId,
        );
        res.json(orden);
      }
    } catch (err: any) {
      logger.error(err);
      next(err);
    }
  }

  async postOrden(req: Request, res: Response, next: NextFunction) {
    const { orderId } = req.body;

    try {
      if (!orderId || typeof orderId !== 'string') {
        const error: Error = new Error('Please insert a valid OrderId');
        error.statusCode = 400;
        throw error;
      }
      if (req.usuario) {
        const usuario = req.usuario;
        const orden = await ordenesAPI.postOrden(
          usuario._id.toString(),
          orderId,
        );
        const subject = 'Orden completada';
        const message = 'Su orden fue completada con exito';
        await EmailService.sendEmail(usuario.email, subject, message);

        res.json(orden);
      }
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
}

export const ordenController = new Orden();
