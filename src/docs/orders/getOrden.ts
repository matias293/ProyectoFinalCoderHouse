export default {
  get: {
    tags: ['Orders'],
    description: 'Get a specific order.',
    operationId: 'getOrden',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/OrderId',
        },
        required: true,
        description: 'A order id',
      },
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
              $ref: '#/components/schemas/Order',
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
        description: 'The order does not exist.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/errorOrder',
            },
          },
        },
      },
    },
  },
};
