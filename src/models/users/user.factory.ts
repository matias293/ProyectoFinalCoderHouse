import { UsuariosAtlasDAO } from './DAOs/user';
import logger from '../../services/logger';

export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class UserFactoryDAO {
  static get(tipo: string) {
    switch (tipo) {
      case TipoPersistencia.MongoAtlas:
        logger.info('Retornando Instancia Users Mongo Atlas');
        return new UsuariosAtlasDAO();

      case TipoPersistencia.LocalMongo:
        logger.info('Retornando Instancia Users Mongo Local');
        return new UsuariosAtlasDAO(true);

      default:
        logger.info('Retornando Instancia Users Default');
        return new UsuariosAtlasDAO();
    }
  }
}
