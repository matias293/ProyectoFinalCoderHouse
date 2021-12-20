export default {
  post: {
    tags: ['User'],
    description: 'Sign up to the DB.',
    operationId: 'postLogin',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              telefono: {
                type: 'string',
                description: 'User phone number',
                example: '2645632938',
              },
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test1@test.com',
              },
              password: {
                type: 'string',
                description: ' ',
                example: 'sanlorenzo18',
              },
              repeat_password: {
                type: 'string',
                description: ' Must be the same as password.',
                example: 'sanlorenzo18',
              },
              nombre: {
                type: 'string',
                description: 'User name.',
                example: 'Leandro Romagnoli',
              },
              calle: {
                type: 'string',
                description: 'User address street.',
                example: 'Las Palmeras',
              },
              altura: {
                type: 'string',
                description: 'User address street number.',
                example: '1411 N',
              },
              cp: {
                type: 'string',
                description: 'User postal code.',
                example: 'Q8300',
              },
              piso: {
                type: 'string',
                description: 'User address floor number, optional.',
                example: '1',
              },
              departamento: {
                type: 'string',
                description: 'User address department number, optional.',
                example: '23',
              },
              admin: {
                type: 'boolean',
                description: 'User permission',
                example: 'true',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Successful signup.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      400: {
        description: 'One of the input body must be wrong',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorValidate',
            },
          },
        },
      },
    },
  },
};
