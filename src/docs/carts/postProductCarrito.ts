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

      400: {
        description: `Problem with the id |Product doesn't exist | Choose more stock that have the product | amount it's not a number `,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                errFindToken: { $ref: '#/components/schemas/ErrorTokenM' },
                errTokenNotValid: {
                  $ref: '#/components/schemas/ErrorTokenNotValid',
                },
                ErrorStock: {
                  type: 'object',
                  description: `Don't have that quantity on the stock `,
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Message of error',
                      example: 'There is not stock please check it',
                    },
                    status: {
                      type: 'number',
                      description: 'Number of error',
                      example: '400',
                    },
                  },
                },
                errorIdOrCantidad: {
                  $ref: '#/components/schemas/ErrorIdAddDel',
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
        description: 'Login Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorUserNotExist',
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
