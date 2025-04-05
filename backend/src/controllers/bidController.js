const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { BidService } = require("../services");
const { StatusCodes, BAD_GATEWAY } = require("http-status-codes");

async function createBid(req, res) {
    try {
        const bid = await BidService.bidCreate({
            tenderId: req.body.tenderId,
            contractorId: req.user.id, 
            bidPrice: req.body.bidPrice,
            documents: req.body.documents || [],
            isApproved: req.body.isApproved ?? false,
            remarks: req.body.remarks || '',
            role:req.user.role
        });

        SuccessResponse.data = bid;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


async function getBidOneDetail(req, res) {
    try {
      const response=await BidService.getBidByIds(req.params.id);
      SuccessResponse.data = response;
      return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.error("Error in getUniqueYears controller:", error);
        ErrorResponse.error = error.message || "Something went wrong";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function allBid(req, res) {
    try {
        const response = await BidService.getBid(req.query);

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


async function destroy(req, res) {
    try {
        const user = await BidService.deleteBid({
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


module.exports = { createBid,allBid,destroy,getBidOneDetail};
