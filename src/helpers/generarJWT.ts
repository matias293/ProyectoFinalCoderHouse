import Config from '../config/index';
import { sign } from 'jsonwebtoken';

export const generarJWT = (id: string) => {
  return new Promise((resolve, reject) => {
    const payload = id.toString();

    sign(
      { id: payload },
      Config.JWT_SECRET_KEY,
      {
        expiresIn: Config.TOKEN_KEEP_ALIVE,
      },
      (err, token) => {
        if (err) {
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      },
    );
  });
};
