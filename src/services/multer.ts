import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) {
    cb(null, 'images');
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) {
    cb(null, uuidv4() + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg or png'), false);
  }
};

export default multer({ storage, fileFilter }).single('image');
