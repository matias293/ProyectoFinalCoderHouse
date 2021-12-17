export default {
  post: {
    tags: ['Orders'],
    description: 'Complete the order.',
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
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            OrderId: {
              type: 'string',
              description: 'OrderId',
              example: '61bb70a20b8d5576288a5aa6',
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Su orden fue completada.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Order',
            },
          },
        },
      },
      400: {
        description: `Problem with the id  `,
        content: {
          'application/json': {
            schema: {
              ErrorEstado: {
                type: 'object',
                description: `Status of the order it's not genrated`,

                properties: {
                  message: {
                    type: 'string',
                    description: 'Message of error',
                    example: 'No se encuentra en estado generada',
                  },
                  status: {
                    type: 'number',
                    description: 'Number of error',
                    example: '400',
                  },
                },
              },
              $ref: '#/components/schemas/ErrorId',
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
        description: 'The order doesn t exist.',
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
