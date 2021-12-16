export default {
  get: {
    tags: ['Image'],
    description: 'Get a image',
    operationId: 'getImage',
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'id of the image',
        schema: {
          $ref: '#/components/schemas/FotoId',
        },
        type: 'string',
      },
    ],
    responses: {
      200: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/FotoId',
            },
          },
        },
      },
      404: {
        description: 'There is no image in the product',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorImageNotExist',
            },
          },
        },
      },
    },
  },
};
