export default {
  patch: {
    tags: ['Products'],
    description: 'Delete a product.',
    operationId: 'deleteProducts',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/ProductId',
        },
        required: true,
        description: 'A product id',
      },
      {
        name: 'Bearer-Token',
        in: 'header',
        schema: {
          $ref: '#/components/schemas/Token',
        },
        description: 'An authorization header',
        required: true,
        type: 'string',
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductInput',
          },
        },
      },
    },

    responses: {
      200: {
        description: 'Producto actualizado con exito.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Product',
            },
          },
        },
      },
      400: {
        description: ``,
        content: {
          'application/json': {
            schema: {
              properties: {
                IdMongo: {
                  $ref: '#/components/schemas/ErrorIdMongo',
                },
                errorId: {
                  $ref: '#/components/schemas/ErrorId',
                },
              },
            },
          },
        },
      },
      401: {
        description: `Login and user role errors`,
        content: {
          'application/json': {
            schema: {
              properties: {
                errJWT: {
                  $ref: '#/components/schemas/ErrorValidateJWT',
                },
                errRole: {
                  $ref: '#/components/schemas/ErrorAdmin',
                },
              },
            },
          },
        },
      },
      404: {
        description: `The product doesn't exist`,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorProduct',
            },
          },
        },
      },
      500: {
        description: 'The cart of the user doesn t exist',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorJWTexpires',
            },
          },
        },
      },
    },
  },
};
