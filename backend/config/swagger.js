const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API Server',
      version: '1.0.0',
      description: 'A RESTful API server for managing user data with CRUD operations and avatar image upload functionality',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['firstName', 'lastName', 'country', 'city', 'email'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-incrementing primary key',
              example: 1
            },
            firstName: {
              type: 'string',
              description: 'User\'s first name',
              minLength: 2,
              maxLength: 100,
              example: 'John'
            },
            lastName: {
              type: 'string',
              description: 'User\'s last name',
              minLength: 2,
              maxLength: 100,
              example: 'Doe'
            },
            country: {
              type: 'string',
              description: 'User\'s country',
              minLength: 2,
              maxLength: 100,
              example: 'USA'
            },
            city: {
              type: 'string',
              description: 'User\'s city',
              minLength: 2,
              maxLength: 100,
              example: 'New York'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User\'s email address (must be unique)',
              example: 'john.doe@example.com'
            },
            phoneNumber: {
              type: 'string',
              description: 'User\'s phone number',
              example: '+1234567890'
            },
            avatar: {
              type: 'string',
              description: 'Path to uploaded avatar image',
              example: '/uploads/avatar-1234567890-123456789.jpg'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when user was created',
              example: '2024-01-01T00:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when user was last updated',
              example: '2024-01-01T00:00:00.000Z'
            }
          }
        },
        UserInput: {
          type: 'object',
          required: ['firstName', 'lastName', 'country', 'city', 'email'],
          properties: {
            firstName: {
              type: 'string',
              description: 'User\'s first name',
              minLength: 2,
              maxLength: 100,
              example: 'John'
            },
            lastName: {
              type: 'string',
              description: 'User\'s last name',
              minLength: 2,
              maxLength: 100,
              example: 'Doe'
            },
            country: {
              type: 'string',
              description: 'User\'s country',
              minLength: 2,
              maxLength: 100,
              example: 'USA'
            },
            city: {
              type: 'string',
              description: 'User\'s city',
              minLength: 2,
              maxLength: 100,
              example: 'New York'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User\'s email address (must be unique)',
              example: 'john.doe@example.com'
            },
            phoneNumber: {
              type: 'string',
              description: 'User\'s phone number',
              example: '+1234567890'
            },
            avatar: {
              type: 'string',
              format: 'binary',
              description: 'Avatar image file (JPEG, JPG, PNG, GIF, WebP, max 5MB)'
            }
          }
        },
        UserUpdate: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: 'User\'s first name',
              minLength: 2,
              maxLength: 100,
              example: 'Jane'
            },
            lastName: {
              type: 'string',
              description: 'User\'s last name',
              minLength: 2,
              maxLength: 100,
              example: 'Smith'
            },
            country: {
              type: 'string',
              description: 'User\'s country',
              minLength: 2,
              maxLength: 100,
              example: 'Canada'
            },
            city: {
              type: 'string',
              description: 'User\'s city',
              minLength: 2,
              maxLength: 100,
              example: 'Toronto'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User\'s email address (must be unique)',
              example: 'jane.smith@example.com'
            },
            phoneNumber: {
              type: 'string',
              description: 'User\'s phone number',
              example: '+1987654321'
            },
            avatar: {
              type: 'string',
              format: 'binary',
              description: 'Avatar image file (JPEG, JPG, PNG, GIF, WebP, max 5MB)'
            }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully'
            },
            data: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        SuccessListResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Users retrieved successfully'
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/User'
              }
            },
            count: {
              type: 'integer',
              example: 1
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'email'
                  },
                  message: {
                    type: 'string',
                    example: 'Please provide a valid email address'
                  }
                }
              }
            }
          }
        },
        HealthResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Server is running'
            },
            timestamp: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z'
            },
            environment: {
              type: 'string',
              example: 'development'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './server.js'], // paths to files containing OpenAPI definitions
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};