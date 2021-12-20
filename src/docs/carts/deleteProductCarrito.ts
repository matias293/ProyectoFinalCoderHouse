export default {
  delete: {
    tags: ['Cart'],
    description: 'Delete a product in the cart',
    operationId: 'deleteCarritoProduct',
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
      200: {
        description: 'Product was removed successfully from the cart.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Cart of the user.',
              items: {
                $ref: '#/components/schemas/Cart',
              },
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
                errorIdOrCantidad: {
                  $ref: '#/components/schemas/ErrorIdAddDel',
                },
                ErrorQuantity: {
                  type: 'object',

                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of error',
                      example: `You don't have that quantity in your cart, please check it`,
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
      404: {
        description: 'The cart of the user doesn t exist',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorCartNotExist',
            },
          },
        },
      },
      500: {
        description: 'The Token it s expire you should login again',
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
