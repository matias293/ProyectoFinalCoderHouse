// import supertest, { SuperAgentTest } from 'supertest';
// import mongoose from 'mongoose';
// import { expect } from 'chai';

// import Product from '../models/productos/DAOs/producto'
// import Server from '../services/server';
// import Config from '../config/index'

// const testImage = `${__dirname}/../../1.png`

// const mockData = [
//   {
//     1,

// },
// {
//     _id: '6195bc63027cc3f4d6787841',
//     nombre: 'Xbox',
//     precio: 123,
//     descripcion:'Consola',
//     codigo:'dsf1asdf',
//     foto:'http://image.com/2',
//     stock:1

// },
// {
//     _id: '6196a510e5f7ea7d5b67ef2a',
//     nombre: 'PC',
//     precio: 123,
//     descripcion:'Ordenador',
//     codigo:'sdfsdf1da',
//     foto:'http://image.com/3',
//     stock:34

// }
//       ]

// describe('Test de productos', ()=> {
//   let connection;
//   let newMongo;
//  let request: SuperAgentTest;

//     beforeAll(async () => {

//       mongoose.connect(Config.MONGO_TEST)

//        await Product.insertMany(mockData)

//        request = supertest.agent(Server);
//     });

//     afterAll(async () => {
//         await Product.deleteMany()
//         await mongoose.disconnect();
//         Server.close()

//     });

//     //   test('Deberia recibir un mensaje que no existen productos disponible', async () => {
//     //    const msge = {error: 'No hay productos cargados'}
//     //     jest
//     //       .spyOn(Product, 'find')
//     //       .mockImplementationOnce(() => Promise.resolve(msge) );

//     //     const response = await request.get('/api/productos/listar');

//     //     expect(response.body.productos).to.deep.equal(msge);
//     //   });

//      test('Deberia recibir un array con productos ', async () => {

//         jest
//           .spyOn(Product, 'find')
//           .mockImplementationOnce(() => Promise.resolve(mockData) );

//         const response = await request.get('/api/products/listar');

//         expect(response.body.data).to.deep.equal(mockData);

//       });

//       test('Deberia recibir un 404 si busco un producto con un id inexistente', async () => {
//         const msge =  { error: 'No existe producto con ese id' }

//         jest
//         .setTimeout(300000)
//           .spyOn(Product, 'find')
//           .mockImplementationOnce(() => Promise.resolve(msge) );

//         const response = await request.get('/api/products/listar/6195bc63027cc3f4d6787842');

//         expect(response.status).to.eql(404);

//       });

//       test('Deberia recibir un objeto con un producto cuando se busca por id', async () => {
//         const mockObject =
//         {
//                 _id: '6196a510e5f7ea7d5b67ef2a',
//           nombre: 'PC',
//           precio: 123,
//           descripcion:'Ordenador',
//           codigo:'sdfsdf1da',
//           foto:'http://image.com/3',
//           stock:34

//       }

//         jest
//           .spyOn(Product, 'find')
//           .mockImplementationOnce(() => Promise.resolve(mockData) );

//         const response = await request.get('/api/products/listar/6196a510e5f7ea7d5b67ef2a');

//          expect(response.body.data).to.deep.equal(mockObject);
//       });

//       test('deberia crear un producto correctamente', async () => {
//         const body = {
//           nombre: 'Nintendo Switch',
//           precio: 3451,
//           descripcion:'Consola',
//           codigo:'dfbdfg1',
//           foto:'http://image.com/4',
//           stock:53,
//             };
//         // jest.spyOn(Product.prototype, 'save').mockResolvedValueOnce(body);

//         const response = await request.post('/api/products/agregar').send(body)

//         expect(response.status).to.eql(200);

//         const newProduct = response.body;

//         expect(newProduct.data).to.include.keys('nombre', 'precio','foto');

//         expect(newProduct.data.nombre).to.equal(body.nombre);
//         expect(newProduct.data.precio).to.equal(body.precio);
//         expect(newProduct.data.stock).to.equal(body.stock);
//       });

//       test('deberia recibir un error 400 al querer crear un producto y mandar mal el body', async () => {
//         const body = {};
//         const response = await request.post('/api/products/agregar').send(body);
//         expect(response.status).to.eql(422);

//       });

//       test('Debe actualizar y devolver un producto', async () => {
//         const body = {
//           nombre: 'SEGA',
//           precio: 34,
//           descripcion:'Consola vieja',
//         };

//         const response = await request.put('/api/products/actualizar/61926b43443b578070e0b1f1').send(body)

//         const expectedBody = {
//           _id: '61926b43443b578070e0b1f1',
//           nombre: 'SEGA',
//           precio: 34,
//           descripcion:'Consola vieja',
//           codigo:'dsf1da',
//           foto:'http://image.com/1',
//           stock:12,
//         }

//          expect(response.body.data).to.deep.equal(expectedBody);
//       });

//       test('Debe eliminar un producto', async () => {

//         const response = await request.delete('/api/products/borrar/6196a510e5f7ea7d5b67ef2a')

//         let expectedMessage = {
//           msg:'Producto borrado'
//         }

//          expect(response.body).to.deep.equal(expectedMessage);
//       });

// })
