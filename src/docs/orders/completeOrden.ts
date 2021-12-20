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
            $ref: '#/components/schemas/OrderId',
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
              Order: {
                type: 'object',
                description: 'An Order.',
                properties: {
                  user: {
                    $ref: '#/components/schemas/UserId',
                  },
                  items: {
                    properties: 'array',
                    $ref: '#/components/schemas/ProductOrder',
                  },
                  total: {
                    type: 'number',
                    description: 'Total price of the order.',
                    example: '1500',
                  },

                  timestamp: {
                    type: 'string',
                    description: 'Date and time when the order was created.',
                    example: '2021-12-01T00:02:43.013Z',
                  },
                  estado: {
                    type: 'string',
                    description: 'The status of the order',
                    example: 'FINALIZADO',
                  },
                  id: {
                    $ref: '#/components/schemas/OrderId',
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: `Problem with the id `,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ErrorEstado: {
                  type: 'object',
                  description: `Status of the order it's not genrated`,

                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of error',
                      example: 'La orden no se encuentra en estado generada',
                    },
                    status: {
                      type: 'number',
                      description: 'Number of error',
                      example: '400',
                    },
                  },
                },
                errId: {
                  $ref: '#/components/schemas/ErrorId',
                },
                errMongoId: {
                  $ref: '#/components/schemas/ErrorIdMongo',
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
