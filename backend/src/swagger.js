// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
        url: "http://localhost:3000",
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
