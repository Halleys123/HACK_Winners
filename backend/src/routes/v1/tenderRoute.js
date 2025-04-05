const express = require("express");
const { TenderController } = require("../../controllers");
const router = express.Router();
const { AuthRequestMiddleware } = require("../../middlewares");

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
 *     security:
 *       - bearerAuth: []
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
router.post("/",AuthRequestMiddleware.checkAuth, TenderController.createTender);

/**
 * @swagger
 * /api/v1/tender/get:
 *   get:
 *     summary: Get all tenders with optional filters
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
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
router.get("/get", AuthRequestMiddleware.checkAuth,TenderController.allTender);



/**
 * @swagger
 * /api/v1/tender/approve/{bidId}:
 *   patch:
 *     summary: Approve a bid and close the corresponding tender
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bidId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the bid to approve
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               closingRemarks:
 *                 type: string
 *                 example: "Approved due to lowest bid and strong portfolio"
 *     responses:
 *       200:
 *         description: Bid approved and tender closed successfully
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
 *                   example: "Bid approved and tender closed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     bid:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                         bidPrice:
 *                           type: number
 *                           example: 4500000
 *                         isApproved:
 *                           type: boolean
 *                           example: true
 *                     tender:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 101
 *                         title:
 *                           type: string
 *                           example: "Bridge construction in Gaya"
 *                         status:
 *                           type: string
 *                           example: "Closed"
 *       400:
 *         description: Bid or Tender not found
 *       500:
 *         description: Failed to approve bid or close tender
 */

router.patch("/approve/:bidId",AuthRequestMiddleware.checkAuth,TenderController.approveBidAndCloseTender);


/**
 * @swagger
 * /api/v1/tender/get/{id}:
 *   get:
 *     summary: Get a tender by ID
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the tender
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Tender fetched successfully
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
 *                   example: "Tender fetched successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Tender'
 *       400:
 *         description: Invalid ID or bad request
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Tender not found
 */

router.get("/get/:id",AuthRequestMiddleware.checkAuth,TenderController.getTenderById)


/**
 * @swagger
 * /api/v1/tender/delete/{id}:
 *   delete:
 *     summary: Delete a tender by ID
 *     tags: [Tenders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the tender to delete
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Tender deleted successfully
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
 *                   example: "Tender deleted successfully"
 *       400:
 *         description: Invalid ID or bad request
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Tender not found
 */

router.delete("/delete/:id",AuthRequestMiddleware.checkAuth,TenderController.destroy)

module.exports = router;
