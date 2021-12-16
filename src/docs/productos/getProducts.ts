export default {
  get: {
    tags: ['Products'],
    description: 'Get  all products.',
    operationId: 'getProducts',
    parameters: [],
    responses: {
      200: {
        description: '',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of products.',
              items: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
        },
      },
      404: {
        description: `Didn't find any products`,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  description: 'Message of error',
                  example: 'Not products avaibles',
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
