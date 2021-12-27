import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';

import { Error } from '../models/users/user.interface';
import { generarJWT } from '../helpers/generarJWT';
import logger from '../services/logger';
import Config from '../config/index';
import { UserAPI } from '../apis/users';
import { schemaAuth, schemaLogin } from '../helpers/validators';
import { EmailServiceEthereal } from '../services/ethereal';

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

      return res.json({ token, msge: 'Se logeo correctamente ' });
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

      const destination = Config.ETHEREAL_EMAIL;
      const subject = 'Nuevo Registo';
      const content = `
        <p> El usuario ${result.email} creo un usuario  </p>
        `;
      EmailServiceEthereal.sendEmail(destination, subject, content);
      return res.status(201).json(user);
    } catch (err: any) {
      if (err.isJoi === true) err.statusCode = 400;
      logger.error(err);
      next(err);
    }
  }
}

export const authController = new Auth();
