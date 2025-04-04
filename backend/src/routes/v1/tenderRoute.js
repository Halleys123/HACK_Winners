const express = require("express");
const { TenderController } = require("../../controllers");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Tender:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "a1b2c3d4"
 *         title:
 *           type: string
 *           example: "Construction of Rural Roads in Bihar"
 *         description:
 *           type: string
 *           example: "Development and maintenance of rural roads under PMGSY scheme."
 *         tenderNumber:
 *           type: string
 *           example: "TND2025001"
 *         estimatedCost:
 *           type: number
 *           example: 50000000
 *         category:
 *           type: string
 *           example: "Infrastructure"
 *         currency:
 *           type: string
 *           example: "INR"
 *         releaseDate:
 *           type: string
 *           format: date-time
 *           example: "2025-04-01T00:00:00.000Z"
 *         submissionDeadline:
 *           type: string
 *           format: date-time
 *           example: "2025-04-30T00:00:00.000Z"
 *         status:
 *           type: string
 *           enum: [Open, Closed]
 *           example: "Open"
 *         createdBy:
 *           type: number
 *           example: 1
 *         documents:
 *           type: object
 *           example:
 *             requirementsDoc: "https://gov-tenders.in/docs/TND2025001-req.pdf"
 *             sitePlan: "https://gov-tenders.in/docs/TND2025001-siteplan.pdf"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/tender/:
 *   post:
 *     summary: Create a new tender
 *     tags: [Tenders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tenderNumber
 *               - estimatedCost
 *               - category
 *               - releaseDate
 *               - submissionDeadline
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tenderNumber:
 *                 type: string
 *               estimatedCost:
 *                 type: number
 *               category:
 *                 type: string
 *               currency:
 *                 type: string
 *                 example: "INR"
 *               releaseDate:
 *                 type: string
 *                 format: date-time
 *               submissionDeadline:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [Open, Closed]
 *               createdBy:
 *                 type: number
 *               documents:
 *                 type: object
 *     responses:
 *       201:
 *         description: Tender created successfully
 *       400:
 *         description: Invalid input or schema
 */
router.post("/", TenderController.createTender);

/**
 * @swagger
 * /api/v1/tender/get:
 *   get:
 *     summary: Get all tenders with optional filters
 *     tags: [Tenders]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter tenders by title (partial match)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter tenders by category
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Open, Closed]
 *         description: Filter tenders by status
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Release date range start
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Release date range end
 *     responses:
 *       200:
 *         description: Successfully retrieved tenders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Tenders retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tender'
 *                 error:
 *                   type: object
 *                   nullable: true
 *       400:
 *         description: Bad request or validation error
 */
router.get("/get", TenderController.allTender);

module.exports = router;
