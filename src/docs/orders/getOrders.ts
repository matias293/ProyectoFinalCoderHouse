export default {
  get: {
    tags: ['Orders'],
    description: 'Get a specific order.',
    operationId: 'getOrden',
    parameters: [
      {
        name: 'Bearer-Token',
        in: 'header',
        schema: {
          $ref: '#/components/schemas/OrderId',
        },
        description: 'An authorization header',
        required: true,
        type: 'string',
      },
    ],
    responses: {
      200: {
        description: 'Order was finded.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Order',
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
        description: 'The user doesn t have orders',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorOrder',
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
