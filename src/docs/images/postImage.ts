export default {
  post: {
    tags: ['Image'],
    description: 'Post a image',
    operationId: 'postImage',
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
      401: {
        description: 'Error with token or the user is not adming',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                errJWT: { $ref: '#/components/schemas/ErrorValidateJWT' },
                errAdmin: { $ref: '#/components/schemas/ErrorAdmin' },
              },
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
