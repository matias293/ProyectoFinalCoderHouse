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
      201: {
        description: 'Su compra se realizo correctamente',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Cart',
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
      400: {
        description: `Product doesn't exist | Choose more stock that have the product | amount it's not a number `,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ErrorQuantity: {
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
      404: {
        description: 'The cart of the user doesn t exist',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorCartNotExist',
            },
          },
        },
      },
    },
  },
};
