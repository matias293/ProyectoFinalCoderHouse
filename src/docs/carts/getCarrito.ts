export default {
  get: {
    tags: ['Cart'],
    description: 'Get the cart of the user.',
    operationId: 'getCarrito',
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
        description: 'Show the cart of the user',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Cart',
            },
          },
        },
      },
      404: {
        description: `The cart wasn't found `,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorCartNotExist',
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
