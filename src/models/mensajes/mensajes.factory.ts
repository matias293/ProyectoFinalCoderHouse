import { MensajesAtlasDAO } from './DAOs/mongo';
import logger from '../../services/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class MensajesFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        logger.info('Retornando Instancia Mensajes Mongo Atlas');
        return new MensajesAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info('Retornando Instancia Mensajes Mongo Local');
        return new MensajesAtlasDAO(true);

      default:
        logger.info('Retornando Instancia Mensajes Default');
        return new MensajesAtlasDAO();
    }
  }
}
