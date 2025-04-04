const express = require("express");
const { UserController } = require("../../controllers");
const router = express.Router();
const { AuthRequestMiddleware } = require('../../middlewares');

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

module.exports = router;
