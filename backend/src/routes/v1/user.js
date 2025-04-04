const express = require("express");
const { UserController } = require("../../controllers");
const router = express.Router();
const { AuthRequestMiddleware } = require("../../middlewares");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           example: "securepassword123"
 *         ethAddress:
 *           type: string
 *           example: "0x123abc456def"
 *         role:
 *           type: string
 *           enum: [Admin, Contractor, Transporter]
 *           example: "Admin"
 *         kycVerified:
 *           type: boolean
 *           example: true
 *         extraDetails:
 *           type: object
 *           example: { "company": "XYZ Corp", "location": "New York" }
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-09-15T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-09-16T14:00:00Z"
 */

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               ethAddress:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [Admin, Contractor, Transporter]
 *               kycVerified:
 *                 type: boolean
 *               extraDetails:
 *                 type: object
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input or schema
 */
router.post("/register", UserController.createUser);

/**
 * @swagger
 * /api/v1/user/get:
 *   get:
 *     summary: Get all users with optional filters
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         description: Filter users by email
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter users by name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [Admin, Contractor, Transporter]
 *         description: Filter users by role
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter users created after this date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter users created before this date
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 error:
 *                   type: object
 *       400:
 *         description: Bad request or validation error
 */
router.get("/get", UserController.allUser);

module.exports = router;
