export default {
  components: {
    schemas: {
      MensajeId: {
        type: 'string',
        description: 'An id of a message',
        example: '61b7de870eff09bc1c3c7d21',
      },
      ProductId: {
        type: 'string',
        description: 'An id of a product',
        example: '61b39229e37859960ff4deff',
      },
      FotoId: {
        ype: 'string',
        description: 'An id of a image',
        example: '2aa9b21f-499a-4905-b510-61e14317d2711.png',
      },
      Token: {
        type: 'string',
        description: 'The token from user',
        example:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjUxOTc0NzcyZjUwZjFkZDk4ZmJmYyIsImlhdCI6MTYzOTU3MTkyNSwiZXhwIjoxNjM5NTg2MzI1fQ.HF9g9hN0-tdpAJXdP_b4Gwrf2OmbTLnVHpCwCzZg9FI',
      },
      UserId: {
        type: 'string',
        description: 'An id of an user.',
        example: '61b3b2b3831f16e920d397fa',
      },
      OrderId: {
        type: 'string',
        description: 'An id of an order.',
        example: '61b88ca49f77c31a124919af',
      },
      User: {
        type: 'object',
        description: 'User data',
        properties: {
          id: {
            $ref: '#/components/schemas/UserId',
          },
          nombre: {
            type: 'string',
            description: 'User name.',
            example: 'Leandro Romagnoli',
          },
          telefono: {
            type: 'string',
            description: 'User phone number',
            example: '+5632937',
          },
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@test.com',
          },
          password: {
            type: 'string',
            description: 'User password.',
            example:
              '$2b$10$COGraf90Hk280601bdep9eezCbW/Cz3JzuWTS9aMJMkuRuyrQKgWK',
          },
          direccion: {
            calle: {
              type: 'string',
              description: 'User address street.',
              example: 'San Juan ',
            },
            altura: {
              type: 'string',
              description: 'User address street number.',
              example: '1411 N',
            },
            cp: {
              type: 'string',
              description: 'User postal code.',
              example: 'Q8300',
            },
            piso: {
              type: 'string',
              description: `Floor number,it's optional`,
              example: '13a',
            },
            departamento: {
              type: 'string',
              description: 'User address department number, optional.',
              example: '23 c',
            },
          },
          admin: {
            type: 'boolean',
            description: 'User permission',
            example: 'true',
          },
        },
      },
      UserData: {
        type: 'object',
        description: 'User data.',
        properties: {
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@test.com',
          },
          nombre: {
            type: 'string',
            description: 'User name.',
            example: 'Leandro Romagnoli',
          },
          calle: {
            type: 'string',
            description: 'User address street.',
            example: 'Las palmeras',
          },
          altura: {
            type: 'string',
            description: 'User address street number.',
            example: '1411 N',
          },
          piso: {
            type: 'string',
            description: 'User address floor number, optional.',
            example: '13a',
          },
          departamento: {
            type: 'string',
            description: 'User address department number, optional.',
            example: '23',
          },
          codigoPostal: {
            type: 'string',
            description: 'User postal code.',
            example: '5400',
          },

          telefono: {
            type: 'string',
            description: 'User phone number, with international code.',
            example: '+56912345678',
          },
        },
      },
      Product: {
        type: 'object',
        description: 'A product.',
        properties: {
          id: {
            $ref: '#/components/schemas/ProductId',
          },
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Pc gamer',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example: 'Ryzen 5 16gb ram ssd',
          },

          precio: {
            type: 'number',
            description: 'Product price',
            example: '200000',
          },
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'Pc escritorio',
          },
          foto: {
            type: 'array',
            description: 'Array of images',
            items: {
              $ref: '#/components/schemas/FotoId',
            },
          },

          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      ProductInput: {
        type: 'object',
        description:
          'Product data when saving a new product or editing an existing one.',
        properties: {
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Pc gamer',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example: 'Ryzen 5 16gb ram ssd',
          },

          precio: {
            type: 'number',
            description: 'Product price',
            example: '200000',
          },
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'Pc escritorio',
          },

          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      ProductCart: {
        type: 'object',
        description: 'A product in the cart.',
        properties: {
          producto: {
            $ref: '#/components/schemas/ProductId',
          },
          quantity: {
            type: 'number',
            description: 'Amount of this product in the cart.',
            example: '2',
          },
        },
      },
      ProductOrder: {
        type: 'object',
        description: 'A product in an order.',
        properties: {
          id: {
            $ref: '#/components/schemas/ProductId',
          },

          quantity: {
            type: 'number',
            description: 'Amount of this product in the order.',
            example: '1',
          },
        },
      },
      Cart: {
        type: 'object',
        description: 'A cart.',
        properties: {
          user: {
            $ref: '#/components/schemas/UserId',
          },
          items: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ProductOrder',
            },
          },
          total: {
            type: 'number',
            description: 'Total price of the order.',
            example: '1500',
          },

          timestamp: {
            type: 'string',
            description: 'Date and time when the order was created.',
            example: '2021-12-01T00:02:43.013Z',
          },
          id: {
            $ref: '#/components/schemas/OrderId',
          },
        },
      },
      Order: {
        type: 'object',
        description: 'An Order.',
        properties: {
          user: {
            $ref: '#/components/schemas/UserId',
          },
          items: {
            properties: 'array',
            $ref: '#/components/schemas/ProductOrder',
          },
          total: {
            type: 'number',
            description: 'Total price of the order.',
            example: '1500',
          },
          estado: {
            type: 'string',
            description: 'The status of the order',
            example: 'GENERADO',
          },
          timestamp: {
            type: 'string',
            description: 'Date and time when the order was created.',
            example: '2021-12-01T00:02:43.013Z',
          },
          id: {
            $ref: '#/components/schemas/OrderId',
          },
        },
      },
      Message: {
        type: 'object',
        description: 'A chat message.',
        properties: {
          message: {
            type: 'string',
            description: 'Text in the message.',
            example: 'stock',
          },
          from: {
            type: 'string',
            description:
              'Indicates if the message was sent by the user or by the system.',
            example: 'Yo',
          },
        },
      },
      ErrorTokenM: {
        type: 'object',
        description: `Didn't find any token`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'No hay token en la petición',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '401',
          },
        },
      },

      ErrorTokenNotValid: {
        type: 'object',
        description: `Token not valid`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'Token no válido',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '401',
          },
        },
      },
      ErrorUserNotExist: {
        type: 'object',
        description: `User not find in the DB`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'Unathorized',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '401',
          },
        },
      },
      ErrorImageNotExist: {
        type: 'object',
        description: `Image not find in the DB`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'There is no image with that id',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '404',
          },
        },
      },
      ErrorCartNotExist: {
        type: 'object',
        description: `Cart not find in the DB`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'cart not found',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '404',
          },
        },
      },
      ErrorAdmin: {
        type: 'object',
        description: `The user doesn't have admin role`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'Unathorized',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '401',
          },
        },
      },
      ErrorProduct: {
        type: 'object',
        description: `The product doesn't exist in the DB`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'Product doesn t exist',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '404',
          },
        },
      },
      errorJWTexpires: {
        type: 'object',
        description: `The order doesn't exist in the DB`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'jwt expires',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '500',
          },
        },
      },
      errorOrder: {
        type: 'object',
        description: `The order doesn't exist in the DB`,

        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'order doesn t exist',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '404',
          },
        },
      },
      ErrorId: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: `Please insert a product id valid`,
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '400',
          },
        },
      },
      ErrorIdAddDel: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: `"id" its required | "\"cantidad\" must be greater than or equal to 1" `,
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '400',
          },
        },
      },
      ErrorIdMongo: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: `El id no es valido de mongo`,
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '400',
          },
        },
      },
      ErrorValidateJWT: {
        type: 'object',
        description: `One ore more of the must be wrong`,
        properties: {
          errFindToken: { $ref: '#/components/schemas/ErrorTokenM' },
          errTokenNotValid: { $ref: '#/components/schemas/ErrorTokenNotValid' },
          errUserNotExist: { $ref: '#/components/schemas/ErrorUserNotExist' },
        },
      },
      ErrorQuantity: {
        type: 'object',
        description: `Quantity it's not a number`,
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'Please insert a valid quantity',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '400',
          },
        },
      },
      ErrorProductCart: {
        type: 'object',
        description: `The product doesn't exist in the cart`,
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example: 'Product doesn t exist',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '400',
          },
        },
      },
      ErrorValidate: {
        type: 'object',
        description: `One ore more of the must be wrong`,
        properties: {
          message: {
            type: 'string',
            description: 'Message of error',
            example:
              '"someimput" must be a string or "someimput" it s required',
          },
          status: {
            type: 'number',
            description: 'Number of error',
            example: '400',
          },
        },
      },
    },
  },
};
