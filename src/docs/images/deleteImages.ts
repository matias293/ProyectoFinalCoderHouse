export default {
  delete: {
    tags: ['Image'],
    description: 'Delete a image',
    operationId: 'deleteImage',
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
        description: 'Imagen borrada',
        content: {
          'application/json': {},
        },
      },
      400: {
        description: 'Error with the id or the token',
        content: {
          'application/json': {
            schema: {
              properties: {
                errFindToken: { $ref: '#/components/schemas/ErrorTokenM' },
                errTokenNotValid: {
                  $ref: '#/components/schemas/ErrorTokenNotValid',
                },
                errId: { $ref: '#/components/schemas/ErrorId' },
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
                errUserNotExist: {
                  $ref: '#/components/schemas/ErrorUserNotExist',
                },
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
