import { MyMongoClient } from '../services/dbMongo';
import {
  ProductModel,
  ProductosAtlasDAO,
} from '../models/productos/DAOs/mongo';
import {
  ProductI,
  newProductI,
  newProductU,
} from '../models/productos/products.interfaces';

describe('Prueba de Productos', () => {
  let daoTest: ProductosAtlasDAO;
  beforeAll(() => {
    //Mock the connect method of MyMongoClient
    jest
      .spyOn(MyMongoClient.prototype, 'connect')
      .mockImplementation(async () => {
        console.log('base de datos');
      });
    daoTest = new ProductosAtlasDAO();
  });

  describe('ProductDao Get', () => {
    //     it('deberia devolver array vacio cuando busco por id un producto que no existe ', async () => {
    //       const mockData: ProductI[] = [];
    //       const id = '61994f4a02cb778668c50409';
    //       jest.spyOn(ProductModel, 'findById').mockResolvedValueOnce(mockData);
    //       const data = await daoTest.get(id);

    //       expect(data).toEqual(mockData);
    //     });
    it('deberia devolver array vacio  cuando no hay  productos disponibles', async () => {
      const mockData: ProductI[] = [];
      jest.spyOn(ProductModel, 'find').mockResolvedValueOnce(mockData);
      const data = await daoTest.get();

      expect(data).toEqual(mockData);
    });

    //     it('deberia traerme el objeto que quiero si le paso un id que existe', async () => {
    //       const mockResponse: ProductI = {
    //         _id: '61926b43443b578070e0b1f1',
    //         nombre: 'Play',
    //         precio: 123,
    //         descripcion: 'playstation 4',
    //         categoria: 'Consola',
    //         fotos: [{ idImage: '82e0dcb2-42c4-4bb6-8749-29b65eb5ec11perfil.jpg' }],
    //         stock: 12,
    //       };

    //       jest
    //         .spyOn(MyMongoClient.prototype, 'isValidId')
    //         .mockImplementationOnce(() => true);

    //       jest.spyOn(ProductModel, 'findById').mockResolvedValueOnce(mockResponse);

    //       const data = await daoTest.get(mockResponse._id);

    //       expect(data).toEqual([mockResponse]);
    //     });
  });

  //   describe('ProductDao Add', () => {
  //     it('deberia guardar correctamente el nuevo producto', async () => {
  //       const mockResponse: newProductI = {
  //         nombre: 'Play',
  //         precio: 123,
  //         descripcion: 'playstation 4',
  //         categoria: 'Consola',
  //         fotos: [],
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
  //       const newData: newProductU = {
  //         nombre: 'Xbox',
  //         precio: 123,
  //         descripcion: 'Xbox One',
  //         stock: 1,
  //       };
  //       const _id = '61994f4a02cb778668c50409';

  //       const mockResponse = {
  //         _id,
  //         categoria: 'Consola',
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
  //         .mockResolvedValueOnce({
  //           msg: 'Producto borrado',
  //         });

  //       await daoTest.delete(id);

  //       expect(deleteFunction).toHaveBeenCalled();
  //       expect(deleteFunction).toHaveBeenCalledWith(id);
  //     });
  //   });
});
