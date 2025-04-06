const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { TenderService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const {Bid,TenderDetail} =require("../models")
const { BidRepostory } = require("../repositories");
const BidRepo = new BidRepostory();

async function createTender(req, res) {
    try {
        const tender = await TenderService.tenderCreate({
            title: req.body.title,
            description: req.body.description,
            tenderNumber: req.body.tenderNumber,
            estimatedCost: req.body.estimatedCost,
            category: req.body.category,
            currency: req.body.currency || 'INR',
            releaseDate: req.body.releaseDate,
            submissionDeadline: req.body.submissionDeadline,
            status: req.body.status || 'Open',
            createdBy: req.user.id,
            documents: req.body.documents || [],
        });

        SuccessResponse.data = tender;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


  const approveBidAndCloseTender = async (req, res) => {
    try {
      const { bidId } = req.params;
      const { closingRemarks } = req.body;

      const bid = await BidRepo.findOne({
        where: { id: bidId },
        include: [
          {
            model: TenderDetail,
            as: 'tender' 
          }
        ]
      });

      if (!bid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Bid not found',
          data: [],
          error: 'Bid not found'
        });
      }

      const tender = bid.tender;
      if (!tender) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Tender not found for this bid',
          data: [],
          error: 'Tender not associated with bid'
        });
      }

      if (tender.status === 'Closed') {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Tender is already closed. Cannot approve more bids.',
          data: [],
          error: 'Tender already closed'
        });
      }

      // ✅ Safe to proceed now
      bid.isApproved = true;
      await bid.save();

      tender.status = 'Closed';
      await tender.save();

      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Bid approved and tender closed successfully',
        data: {
          bid: {
            id: bid.id,
            bidPrice: bid.bidPrice,
            isApproved: bid.isApproved
          },
          tender: {
            id: tender.id,
            title: tender.title,
            status: tender.status
          }
        },
        error: {}
      });

    } catch (error) {
      console.error('Error in approveBidAndCloseTender:', error.message);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: 'Failed to approve bid or close tender',
        data: [],
        error: error.message
      });
    }
  };


async function allTender(req, res) {
    try {
        const response = await TenderService.getTender(req.query);

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function getTenderById(req, res) {
    try {
      const response=await TenderService.getTenderByIds(req.params.id);
      SuccessResponse.data = response;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.error("Error in getUniqueYears controller:", error);
        ErrorResponse.error = error.message || "Something went wrong";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function destroy(req, res) {
    try {
        const user = await TenderService.deleteTender({
            id:req.params.id
        });

        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error, "the error in controller");
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


module.exports = { createTender, allTender,destroy,approveBidAndCloseTender,getTenderById};
