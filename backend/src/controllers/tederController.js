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
            as: 'tender' // ✅ This matches the alias in Bid model
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
  
      bid.isApproved = true;
    //   bid.remarks = closingRemarks || 'Approved by admin';
      await bid.save();
  
      const tender = bid.tender;
      if (!tender) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Tender not found for this bid',
          data: [],
          error: 'Tender not associated with bid'
        });
      }
  
      tender.status = 'Closed';
    //   tender.closingRemarks = closingRemarks || 'Closed after bid approval';
      await tender.save();
  
      return res.status(StatusCodes.OK).json({
        success: true,
        message: 'Bid approved and tender closed successfully',
        data: {
          bid: {
            id: bid.id,
            bidPrice: bid.bidPrice,
            isApproved: bid.isApproved,
            // remarks: bid.remarks
          },
          tender: {
            id: tender.id,
            title: tender.title,
            status: tender.status,
            // closingRemarks: tender.closingRemarks
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
        const user = await UserService.deleteUser({
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


async function update(req, res) {
    try {
        const user = await UserService.UpdateUser({
            id:req.params.id,
            name: req.body.name,
            rollNo: req.body.rollNo,
            email: req.body.email,
            picture: req.body.picture,
            programmEnroled: req.body.programmEnroled,
            year: req.body.year
        });

        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error, "the error in controller");
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

module.exports = { createTender, allTender,destroy ,update,approveBidAndCloseTender,getTenderById};
