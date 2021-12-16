export default {
  post: {
    tags: ['Products'],
    description: 'Post a new product.',
    operationId: 'addProduct',
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
      201: {
        description: 'Producto agregado con exito.',
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

      400: {
        description: `Error in the input body`,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorValidate',
            },
          },
        },
      },
    },
  },
};
