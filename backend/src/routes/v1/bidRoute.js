const express = require("express");
const { BidController } = require("../../controllers");
const router = express.Router();
const { AuthRequestMiddleware } = require("../../middlewares");

/**
 * @swagger
 * components:
 *   schemas:
 *     Bid:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "bd1e4567-e89b-12d3-a456-426614174000"
 *         tenderId:
 *           type: string
 *           example: "tn123e4567-e89b-12d3-a456-426614174000"
 *         contractorId:
 *           type: string
 *           example: "u123e4567-e89b-12d3-a456-426614174000"
 *         bidPrice:
 *           type: number
 *           example: 150000
 *         isApproved:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T10:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-10-01T12:00:00Z"
 */

/**
 * @swagger
 * /api/v1/bid/:
 *   post:
 *     summary: Submit a new bid
 *     tags: [Bids]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - tenderId
 *               - contractorId
 *               - bidPrice
 *             properties:
 *               tenderId:
 *                 type: string
 *               contractorId:
 *                 type: string
 *               bidPrice:
 *                 type: number
 *               isApproved:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Bid created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", BidController.createBid);

/**
 * @swagger
 * /api/v1/bid/get:
 *   get:
 *     summary: Get all bids with optional filters
 *     tags: [Bids]
 *     parameters:
 *       - in: query
 *         name: tenderId
 *         schema:
 *           type: string
 *         description: Filter bids by tender ID
 *       - in: query
 *         name: contractorId
 *         schema:
 *           type: string
 *         description: Filter bids by contractor ID
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: boolean
 *         description: Filter by approval status
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum bid price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum bid price
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for filtering by creation date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for filtering by creation date
 *     responses:
 *       200:
 *         description: List of bids
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
 *                     $ref: '#/components/schemas/Bid'
 *       400:
 *         description: Bad request or filter error
 */
router.get("/get", BidController.allBid);

module.exports = router;