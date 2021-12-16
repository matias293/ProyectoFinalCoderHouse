export default {
  get: {
    tags: ['Chat'],
    description: 'Get  all the messages.',
    operationId: 'getHistorialChat',
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
        description: '',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of messages.',
              items: {
                $ref: '#/components/schemas/Message',
              },
            },
          },
        },
      },
      404: {
        description: `Didn't find any messages`,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Message of error',
                  example: 'Usted no tiene mensajes',
                },
                status: {
                  type: 'number',
                  description: 'Number of error',
                  example: '404',
                },
              },
            },
          },
        },
      },
    },
  },
};
