import Config from '../config/index';
import mongoose, { ObjectId } from 'mongoose';

export class MyMongoClient {
  private _instance: mongoose.Mongoose;
  client: mongoose.Mongoose;

  constructor() {
    this.client = mongoose;
    this._instance = mongoose;
  }

  async connect(local?: boolean) {
    if (local) {
      await this.connectLocal;
      return;
    } else {
      await this.connectAtlas;
      return;
    }
  }

  transformId(id: string) {
    return new mongoose.Types.ObjectId(id);
  }

  isValidId(id: string): boolean {
    return mongoose.isValidObjectId(id);
  }

  async connectAtlas() {
    if (!this._instance) {
      this._instance = await this.client.connect(Config.MONGO_INGRESS);
    }
    return this._instance;
  }
  async connectLocal() {
    if (!this._instance) {
      const srv = `mongodb://localhost:27017/ecommerce`;
      this._instance = await this.client.connect(srv);
    }
    return this._instance;
  }

  async disconnect() {
    await this.client.connection.close();
  }
}
