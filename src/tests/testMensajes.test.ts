import { MyMongoClient } from '../services/dbMongo';
import { MensajeModel, MensajesAtlasDAO } from '../models/mensajes/DAOs/mongo';
import { MensajesDTO } from '../models/mensajes/mensajes.intefaces';
describe('Prueba de Productos', () => {
  let daoTest: MensajesAtlasDAO;
  beforeAll(() => {
    //Mock the connect method of MyMongoClient
    jest
      .spyOn(MyMongoClient.prototype, 'connect')
      .mockImplementation(async () => {
        console.log('base de datos');
      });
    daoTest = new MensajesAtlasDAO();
  });

  describe('MensajeDao Get', () => {
    it('deberia devolver un array vacio cuando no hay mensaje', async () => {
      const mockData: any = [];
      const userId: string = '61bb66c19ff095990849acdb';
      jest.spyOn(MensajeModel, 'find').mockResolvedValueOnce(mockData);
      const data = await daoTest.get(userId);

      expect(data).toEqual(mockData);
    });

    it('deberia traerme un array con mensajes', async () => {
      const userId: string = '61bb66c19ff095990849acdb';
      let messages: MensajesDTO[] = [];
      const mockResponse: any = [
        {
          from: 'Yo',
          message: 'asd',
        },
        {
          from: 'Robot',
          message:
            'Hola! No he podido comprender tu mensaje. Por favor ingresa una de las siguientes opciones\n    Stock: Para conocer nuestro stock actual.\n    Orden:Para conocer la informacion de tu ultima orden\n    Carrito:Para concer el estado actual de tu carrito\n ',
        },
      ];

      jest.spyOn(MensajeModel, 'find').mockResolvedValueOnce(mockResponse);

      const data = await daoTest.get(userId);
      data.forEach(msg => messages.push(msg));

      expect(messages).toEqual(mockResponse);
    });
  });
});
