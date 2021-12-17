import { MyMongoClient } from '../services/dbMongo';
import { CartModel, CartsAtlasDAO } from '../models/carrito/DAOs/mongo';
import { CartI, ProductCart } from '../models/carrito/carrito.interfaces';

describe('Prueba de CARRITO', () => {
  let daoTest: CartsAtlasDAO;
  beforeAll(() => {
    jest
      .spyOn(MyMongoClient.prototype, 'connect')
      .mockImplementation(async () => {
        console.log('Base de datos conectada');
      });
    daoTest = new CartsAtlasDAO();
  });

  describe('CartDao Get', () => {
    // it('deberia devolver un null al buscar un carrito que no existe', async () => {
    //   const userId = '61bb66c19ff095990849acdb';
    //   const mockResponse = null;
    //   jest.spyOn(CartModel, 'findOne').mockResolvedValueOnce(mockResponse);
    //   const data = await daoTest.get(userId);
    //   console.log(data);
    //   expect(data).toEqual(mockResponse);
    // });

    //   it('deberia develover el carrito con el id ingresado', async () => {
    //     const mockResponse: CartI = {
    //       direccion: {
    //         calle: 'Las tilas',
    //         altura: '1412',
    //         cp: '5400',
    //       },
    //       _id: '61bb66c19ff095990849acde',
    //       createdAt: '16/12/2021 13:17:49',
    //       updatedAt: '16/12/2021 14:04:30',
    //       products: [],
    //       userId: '61bb66c19ff095990849acdb',
    //     };

    // const userId: string = '61bb66c19ff095990849acdb';
    //     jest
    //       .spyOn(MyMongoClient.prototype, 'isValidId')
    //       .mockImplementationOnce(() => true);

    //     jest.spyOn(CartModel, 'findOne').mockResolvedValueOnce(mockResponse);

    //     const data = await daoTest.get(userId);

    //     expect(data).toEqual(mockResponse);
    //   });
    // });

    // describe('CartDao Add', () => {
    //   it('deberia agregar un producto a la cartera', async () => {
    //     const prodCart: ProductCart = {
    //       productId: '61994f4a02cb778668c50409',
    //       quantity: 4,
    //     };
    // const productId: string = '61994f4a02cb778668c50409';
    // const userId: string = '61bb66c19ff095990849acdb';

    //     const mockResponse: CartI = {
    //       direccion: {
    //         calle: 'Las tilas',
    //         altura: '1412',
    //         cp: '5400',
    //       },
    //       _id: '61bb66c19ff095990849acde',
    //       createdAt: '16/12/2021 13:17:49',
    //       updatedAt: '16/12/2021 14:04:30',
    //       products: [prodCart],
    //       userId: '61bb66c19ff095990849acdb',
    //     };
    //     jest.spyOn(CartModel.prototype, 'save').mockResolvedValueOnce('ok');

    //     const result = await daoTest.addProduct(
    //       userId,
    //       productId,
    //       prodCart.quantity,
    //     );

    //     console.log(result);
    //   });
    // });
    // describe('ProductDao createCart', () => {
    //   it('Crea un carrito', async () => {
    //     const direccion = {
    //       calle: 'Las tilas',
    //       altura: '1412',
    //       cp: '5400',
    //     };
    //     const mockResponse: CartI = {
    //       direccion,
    //       _id: '61bb66c19ff095990849acde',
    //       createdAt: '16/12/2021 13:17:49',
    //       updatedAt: '16/12/2021 14:04:30',
    //       products: [],
    //       userId: '61bb66c19ff095990849acdb',
    //     };
    //    const userId : string = '61bb66c19ff095990849acdb'

    //     jest
    //       .spyOn(CartModel.prototype, 'save')
    //       .mockResolvedValueOnce(mockResponse);

    //     const result = await daoTest.createCart(
    //       '61bb66c19ff095990849acdb',
    //       direccion,
    //     );

    //     expect(result).toEqual(mockResponse);
    //   });
    // });

    describe('cartDao clearCart', () => {
      it('deberia borrar correctamente todos los productos de la cartera', async () => {
        // const id: string = '61bb66c19ff095990849acde';
        // const mockResponse: CartI = {
        //   direccion: {
        //     calle: 'Las tilas',
        //     altura: '1412',
        //     cp: '5400',
        //   },
        //   _id: '61bb66c19ff095990849acde',
        //   createdAt: '16/12/2021 13:17:49',
        //   updatedAt: '16/12/2021 14:04:30',
        //   products: [],
        //   userId: '61bb66c19ff095990849acdb',
        // };
        // jest
        //   .spyOn(CartModel.prototype, 'clearCart')
        //   .mockResolvedValueOnce(mockResponse);
        // const result = await daoTest.clearCart(id);
        // expect(result).toEqual(mockResponse);
      });
    });
  });
});
