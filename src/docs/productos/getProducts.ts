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
              description: 'Empty array',
              items: {
                type: 'array',
                productos: '[]',
              },
            },
          },
        },
      },
    },
  },
};
