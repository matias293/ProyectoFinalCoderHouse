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
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              productId: {
                $ref: '#/components/schemas/ProductId',
              },
              image: {
                type: 'file',
                description: 'An file',
                example: 'imagen.jpg',
              },
            },
          },
        },
      },
    },

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
        description: 'Error with login or the user is not admin ',
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
      422: {
        description: `Didn't put any image on the request`,
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
