import { CartsAtlasDAO } from './DAOs/mongo';

import logger from '../../config/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class CartFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        logger.info('Retornando Instancia Cart Mongo Atlas');
        return new CartsAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info('Retornando Instancia Cart Mongo Local');
        return new CartsAtlasDAO(true);

      default:
        logger.info('Retornando Instancia Cart Default');
        return new CartsAtlasDAO();
    }
  }
}
