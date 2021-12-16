// import supertest from 'supertest';

// import { MyMongoClient } from '../services/dbMongo';
// import {
//   ProductModel,
//   ProductosAtlasDAO,
// } from '../models/productos/DAOs/mongo';
// import { ProductI } from '../models/productos/products.interfaces';
// import myServer from '../services/server';

// describe('Prueba de Productos', () => {
//   let daoTest: ProductosAtlasDAO;
//   beforeAll(() => {
//     //Mock the connect method of MyMongoClient
//     jest
//       .spyOn(MyMongoClient.prototype, 'connect')
//       .mockImplementation(async () => {
//         console.log('base de datos');
//       });
//     daoTest = new ProductosAtlasDAO();
//   });

//   describe('ProductDao Get', () => {
//     it('deberia mostar mensaje que no hay productos disponibles', async () => {
//       const mockResponse: string = 'Not products avaibles';

//       jest.spyOn(ProductModel, 'find').mockResolvedValueOnce(mockResponse);
//       const data = await daoTest.get();

//       expect(data).toEqual(mockResponse);
//     });

//     it('deberia traerme el objeto que quiero si le paso un id que existe', async () => {
//       const mockResponse = {
//         _id: '61926b43443b578070e0b1f1',
//         nombre: 'Play',
//         precio: 123,
//         descripcion: 'Consola',
//         codigo: 'dsf1da',
//         foto: 'http://image.com/1',
//         stock: 12,
//       };

//       jest
//         .spyOn(MyMongoClient.prototype, 'isValidId')
//         .mockImplementationOnce(() => true);

//       jest.spyOn(ProductModel, 'findById').mockResolvedValueOnce(mockResponse);

//       const data = await daoTest.get(mockResponse._id);

//       expect(data).toEqual([mockResponse]);
//     });
//   });

//   describe('ProductDao Add', () => {
//     it('deberia guardar correctamente el nuevo producto', async () => {
//       const mockResponse = {
//         nombre: 'Play',
//         precio: 123,
//         descripcion: 'Consola',
//         codigo: 'dsf1da',
//         foto: 'http://image.com/1',
//         stock: 12,
//       };
//       jest.spyOn(ProductModel.prototype, 'save').mockResolvedValueOnce('ok');

//       const result = await daoTest.add(mockResponse);

//       expect(result._id).toBeDefined();
//       expect(result.nombre).toEqual(mockResponse.nombre);
//       expect(result.stock).toEqual(mockResponse.stock);
//     });
//   });
//   describe('ProductDao Update', () => {
//     it('deberia actualizar correctamente el producto', async () => {
//       const newData = {
//         nombre: 'Xbox',
//         precio: 123,
//         descripcion: 'Consola',
//         codigo: 'dsf1asdf',
//         foto: 'http://image.com/2',
//         stock: 1,
//       };
//       const _id = '61994f4a02cb778668c50409';

//       const mockResponse = {
//         _id,
//         ...newData,
//       };

//       jest
//         .spyOn(ProductModel, 'findByIdAndUpdate')
//         .mockResolvedValueOnce(mockResponse);

//       const result = await daoTest.update(_id, newData);

//       expect(result).toEqual(mockResponse);
//     });
//   });

//   describe('ProductDao Delete', () => {
//     it('deberia borrar correctamente un producto', async () => {
//       const id = '61994f4a02cb778668c50409';
//       const deleteFunction = jest
//         .spyOn(ProductModel, 'findByIdAndDelete')
//         .mockResolvedValueOnce(undefined);

//       await daoTest.delete(id);

//       expect(deleteFunction).toHaveBeenCalled();
//       expect(deleteFunction).toHaveBeenCalledWith(id);
//     });
//   });
// });
