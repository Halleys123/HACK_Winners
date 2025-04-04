const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { UserService } = require("../services");
const { StatusCodes } = require("http-status-codes");

async function createUser(req, res) {
    try {
        const user = await UserService.userCreate({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            ethAddress: req.body.ethAddress,
            role: req.body.role, 
            kycVerified: req.body.kycVerified ?? false, 
            extraDetails: req.body.extraDetails || {}
        });

        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}

async function createSign(req, res) {
    try {
        const user = await UserService.userSign({
            email: req.body.email,
            password: req.body.password,
        });

        SuccessResponse.data = user;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


async function allUser(req, res) {
    try {
        const user = await UserService.getUser(req.query);

        SuccessResponse.data = user;
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

module.exports = { createUser, allUser, getUniqueYears,destroy ,update,createSign};
