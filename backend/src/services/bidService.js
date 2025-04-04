const { BidRepostory } = require("../repositories");
const BidRepo = new BidRepostory();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const {Enum} = require('../utils/common');


async function bidCreate(data) {
    try {
        // const allowedRoles = Object.values(Enum.UserRoles);
        // if (!allowedRoles.includes(data.role)) {
        //   throw new AppError(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`, StatusCodes.BAD_REQUEST);
        // }
        const bid = await BidRepo.create(data);
        return bid;
    } catch (error) {
        console.log("The error in the service", error.message);
        if (error.name === "SequelizeValidationError" || error.message === "Schema Validation Issue" ){
            let explanation = [];
          error.errors.forEach((err) => {
            explanation.push(err.message);
          });
          throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else {
          throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
      }
}

async function getBid(query) {
    try {
        const bid = await BidRepo.getByFilters(query);
        return bid;
    } catch (error) {
        console.log("The error in the service", error.message);
        if (error.name === "SequelizeValidationError" || error.message === "Schema Validation Issue" ){
            let explanation = [];
          error.errors.forEach((err) => {
            explanation.push(err.message);
          });
          throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else {
          throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
      }
}

async function getUniqueYears(id) {
    try {
        const years = await StudentRepo.getUniqueYears(id);
        return years;
    } catch (error) {
        console.error("Error in getUniqueYears:", error);
        throw new AppError("Cannot get unique years", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function deleteUser(data) {
    try {
        const response = await StudentRepo.destroy(data.id);
        return response;
    } catch (error) {
        console.log(error, "the error in the service");
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else {
            throw new AppError(
                "Cannot delete the student details",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

async function UpdateUser(data) {
    try {
        const response = await StudentRepo.upDate(data.id,data);
        return response;
    } catch (error) {
        console.log(error, "the error in the service");
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else {
            throw new AppError(
                "Cannot update the student details",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}
module.exports = { bidCreate, getBid, getUniqueYears ,deleteUser,UpdateUser};

