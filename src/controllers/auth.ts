import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';

import { Error } from '../models/error.interface';
import { generarJWT } from '../helpers/generarJWT';
import logger from '../config/logger';
import { UserAPI } from '../apis/users';
import { schemaAuth, schemaLogin } from '../helpers/validators';

declare module 'express-session' {
  interface SessionData {
    user: string;
  }
}

class Auth {
  async postLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await schemaLogin.validateAsync(req.body);
      const user = await UserAPI.query(result.email);
      if (!user) {
        const error: Error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
      }

      const validPassword = bcryptjs.compareSync(
        result.password,
        user.password,
      );
      if (!validPassword) {
        const error: Error = new Error('Unauthorized');
        error.statusCode = 401;
        throw error;
      }

      const token = await generarJWT(user._id);

      return res.json({ token });
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      logger.error(err);
      next(err);
    }
  }

  async postSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await schemaAuth.validateAsync(req.body);

      const userExist = await UserAPI.query(result.email);
      if (userExist) {
        const error: Error = new Error('You already registred with that email');
        error.statusCode = 400;
        throw error;
      }

      const newUsuario = {
        nombre: result.nombre,
        telefono: result.telefono,
        email: result.email,
        password: result.password,
        direccion: {
          calle: result.calle,
          altura: result.altura,
          cp: result.cp,
          piso: result.piso || null,
          departamento: result.departamento || null,
        },
        admin: result.admin || false,
      };
      const user = await UserAPI.addUser(newUsuario);

      return res.status(201).json(user);
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      logger.error(err);
      next(err);
    }
  }

  postLogOut(req: Request, res: Response) {
    if (!req.isAuthenticated()) {
      return res.json({ message: 'Usted no se encuentra logeado' });
    }
    req.session.destroy(err => {
      if (err)
        res.status(500).json({ message: 'Hubo un error al cerrar sesion' });
      else {
        res.json({ message: 'Se cerró su sesion correctmanete' });
      }
    });
  }
}

export const authController = new Auth();
