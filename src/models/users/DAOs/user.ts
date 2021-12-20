import { Schema, model } from 'mongoose';

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { CartAPI } from '../../../apis/carts';
import {
  NewUserI,
  UserBaseClass,
  UserI,
  Direccion,
  UserQuery,
} from '../user.interface';
import logger from '../../../config/logger';
import Config from '../../../config/index';

const UsersSchema = new Schema<NewUserI>({
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  direccion: {
    calle: {
      type: String,
      required: true,
    },
    altura: {
      type: String,
      required: true,
    },
    cp: {
      type: String,
      required: true,
    },
    piso: {
      type: Number,
    },
    departamento: {
      type: String,
    },
  },
  admin: {
    type: Boolean,
    required: true,
  },
});

UsersSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

UsersSchema.pre('save', async function (next) {
  try {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);

    this.password = hash;

    next();
  } catch (error) {
    logger.error(error);
  }
});

export class UsuariosAtlasDAO implements UserBaseClass {
  private srv: string;
  private users: any;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${Config.MONGOLOCAL_INGRESS}`;
    else this.srv = Config.MONGO_INGRESS;
    mongoose.connect(this.srv);
    this.users = model('User', UsersSchema);
  }

  async get(id: string): Promise<UserI> {
    try {
      const user = await this.users.findById(id);

      return user;
    } catch (err: any) {
      return err;
    }
  }

  async add(data: NewUserI): Promise<UserI> {
    const newUser = new this.users(data);
    await newUser.save();
    let direccion: Direccion = {
      calle: newUser.direccion.calle,
      altura: newUser.direccion.altura,
      cp: newUser.direccion.cp,
    };
    if (newUser.direccion.piso) direccion.piso = newUser.direccion.piso;
    if (newUser.direccion.departamento) {
      direccion.departamento = newUser.direccion.departamento;
    }
    await CartAPI.createCart(newUser._id, direccion);
    return newUser;
  }

  async update(id: string, data: NewUserI): Promise<UserI> {
    return this.users.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    await this.users.findByIdAndDelete(id);
  }

  async query(query: UserQuery): Promise<UserI> {
    const result = await this.users.findOne(query);

    return result;
  }

  async validateUserPassword(
    username: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.users.findOne({ username });

    if (!user) return false;

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return false;
    return true;
  }
}

export const ModelUser = model('User', UsersSchema);
