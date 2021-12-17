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
        description: 'Return the image',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/FotoId',
            },
          },
        },
      },
      400: {
        description: 'Error with token or the user is not adming',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                $ref: '#/components/schemas/ErrorId',
              },
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
                errId: { $ref: '#/components/schemas/ErrorId' },
                errJWT: { $ref: '#/components/schemas/ErrorValidateJWT' },
                errAdmin: { $ref: '#/components/schemas/ErrorAdmin' },
              },
            },
          },
        },
      },
      422: {
        description: `Din't put any image on the request`,
        content: {
          'application/json': {
            schema: {
              type: 'object',

              properties: {
                message: {
                  type: 'string',
                  description: 'Message of error',
                  example: 'Seleccione alguna imagen',
                },
                status: {
                  type: 'number',
                  description: 'Number of error',
                  example: '422',
                },
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
