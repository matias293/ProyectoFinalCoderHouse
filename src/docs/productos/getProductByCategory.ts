export default {
  get: {
    tags: ['Products'],
    description: 'Get  all products.',
    operationId: 'getProducts',
    parameters: [
      {
        name: 'categoria',
        in: 'path',
        description: 'Category of products',
        type: 'string',
      },
    ],
    responses: {
      200: {
        description: 'All the products with the category',
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
              type: 'array',
              description: 'Empty array',
              items: {
                productos: '[]',
              },
            },
          },
        },
      },
    },
  },
};
