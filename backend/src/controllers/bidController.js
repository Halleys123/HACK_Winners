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
            remarks: req.body.remarks || ''
        });

        SuccessResponse.data = bid;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
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

async function getUniqueYears(req, res) {
    try {
        const id = req.params.id || null;
        const years = await UserService.getUniqueYears(id);
        SuccessResponse.data = years;
        return res.status(StatusCodes.OK).json(SuccessResponse);
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

module.exports = { createBid, allBid, getUniqueYears,destroy ,update};
