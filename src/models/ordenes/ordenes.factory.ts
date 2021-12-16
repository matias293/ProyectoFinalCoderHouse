import { OrderAtlasDAO } from './DAOs/mongo';
import logger from '../../config/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class OrdenFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        logger.info('Retornando Instancia Ordens Mongo Atlas');
        return new OrderAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info('Retornando Instancia Ordens Mongo Local');
        return new OrderAtlasDAO(true);

      default:
        logger.info('Retornando Instancia Ordens Default');
        return new OrderAtlasDAO();
    }
  }
}
