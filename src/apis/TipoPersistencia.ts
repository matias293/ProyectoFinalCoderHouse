export enum TipoPersistencia {
  LocalMongo = 'LOCAL-MONGO',
  MongoAtlas = 'MONGO-ATLAS',
}

export class TypeModel {
  static get(tipo: string) {
    switch (tipo) {
      case 'development':
        return TipoPersistencia.LocalMongo;

      case 'production':
        return TipoPersistencia.MongoAtlas;

      default:
        return TipoPersistencia.MongoAtlas;
    }
  }
}
