export default {
  post: {
    tags: ['Cart'],
    description: 'Add a product to the cart.',
    operationId: 'addCarritoProduct',
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
            $ref: '#/components/schemas/ProductId',
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Product was added to cart.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Cart',
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
      400: {
        description: `Product doesn't exist | Choose more stock that have the product | amount it's not a number `,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ErrorId: {
                  type: 'object',
                  description: `The id is missing `,
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of error',
                      example: 'Ingresar id del producto',
                    },
                    status: {
                      type: 'number',
                      description: 'Number of error',
                      example: '400',
                    },
                  },
                },
                errorQuantity: {
                  $ref: '#/components/schemas/ErrorQuantity',
                },
                errorProductCart: {
                  $ref: '#/components/schemas/ErrorProductCart',
                },
              },
            },
          },
        },
      },
      422: {
        description: `They didn't send any image `,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                ErrorId: {
                  type: 'object',
                  description: `The image is missing `,
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
        },
      },
      404: {
        description: 'The cart or the product you want to add does not exists.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorCartNotExist',
            },
          },
        },
      },
    },
  },
};
