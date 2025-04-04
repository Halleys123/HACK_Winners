const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { TenderService } = require("../services");
const { StatusCodes } = require("http-status-codes");

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
            createdBy: req.body.createdBy,
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

module.exports = { createTender, allTender, getUniqueYears,destroy ,update};
