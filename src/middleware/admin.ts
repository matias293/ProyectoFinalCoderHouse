import { Request, Response, NextFunction } from 'express';

import { UserI } from '../models/users/user.interface';

declare global {
  namespace Express {
    interface Request {
      usuario?: UserI;
    }
  }
}
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.usuario?.admin) next();
  else {
    res.status(401).json({
      msg: 'Unauthorized',
    });
  }
};
