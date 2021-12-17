export default {
  post: {
    tags: ['Cart'],
    description: 'Create a orden',
    operationId: 'postCarrito',
    parameters: [
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

    responses: {
      200: {
        description: 'Su compra se realizo correctamente',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Cart',
            },
          },
        },
      },

      400: {
        description: ``,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ErrorCarrito: {
                  type: 'object',
                  description: `Cart is doesnt't have products `,
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of error',
                      example: 'Usted no tiene productos en su carrito',
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
          },
        },
      },
      401: {
        description: 'Error with token',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorValidateJWT',
            },
          },
        },
      },
      404: {
        description: 'There is no message with the sistem',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorCartNotExist',
            },
          },
        },
      },
      500: {
        description: 'The token has expired',
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
