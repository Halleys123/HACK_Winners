// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { ServerConfig } = require('./config');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API documentation for User operations",
    },
    servers: [
      {
        url: ServerConfig.SWAGGER_URL,
      },
    ],
    components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
  },
  apis: ["src/routes/**/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
