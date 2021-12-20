import { Request, Response, NextFunction } from 'express';

import { ordenesAPI } from '../apis/orden';
import logger from '../services/logger';
import { EmailService } from '../services/gmail';

import { Error } from '../models/ordenes/orden.interface';

class Orden {
  //Trae todas las ordenes que tiene el usuario
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

  //Trae una orden especifica del usuario
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

  //Finaliza la orden
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

        const ordenUpdated = await ordenesAPI.postOrden(
          usuario._id.toString(),
          orderId,
        );
        const subject = 'Orden completada';
        const message = 'Su orden fue completada con exito';
        await EmailService.sendEmail(usuario.email, subject, message);

        res.json({
          msg: 'Su orden fue completada',
          ordenUpdated,
        });
      }
    } catch (err) {
      logger.error(err);
      next(err);
    }
  }
}

export const ordenController = new Orden();
