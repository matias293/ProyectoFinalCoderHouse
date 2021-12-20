export default {
  post: {
    tags: ['User'],
    description: 'Log in to the system.',
    operationId: 'postLogin',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test1@test.com',
              },
              password: {
                type: 'string',
                description: 'User password.',
                example: 'sanlorenzo18',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successful Login.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  $ref: '#/components/schemas/Token',
                },
              },
            },
          },
        },
      },
      400: {
        description: ' email and/or password wrong or is not found.',
        content: {
          'application/json': {
            schema: {
              properties: {
                errValidate: {
                  $ref: '#/components/schemas/ErrorValidate',
                },
                errUser: {
                  $ref: '#/components/schemas/ErrorUserNotExist',
                },
              },
            },
          },
        },
      },
    },
  },
};
