export default {
  delete: {
    tags: ['Products'],
    description: 'Update a product.',
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
        description: 'Producto borrado',
        content: {
          'application/json': {},
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
    },
  },
};
