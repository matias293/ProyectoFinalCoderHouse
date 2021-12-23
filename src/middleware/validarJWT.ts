import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UserAPI } from '../apis/users';
import logger from '../services/logger';
import { UserI } from '../models/users/user.interface';
import Config from '../config/index';

declare global {
  namespace Express {
    interface Request {
      usuario?: UserI;
    }
  }
}

export const validarJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Bearer-Token');

  if (!token) {
    return res.status(400).json({
      msg: 'No hay token en la petición',
    });
  }

  try {
    const decoded: any = jwt.verify(token, Config.JWT_SECRET_KEY);

    if (!decoded) {
      res.status(400).json({
        msg: 'Token no válido',
      });
    }
    const usuario = await UserAPI.getUsers(decoded.id as string);

    if (!usuario) {
      return res.status(401).json({
        msg: 'Unathorized.',
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
