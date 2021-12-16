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
    },
  },
};
