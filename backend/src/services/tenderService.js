const { TenderRepository } = require("../repositories");
const TenderRepo = new TenderRepository();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const {Enum} = require('../utils/common');


async function tenderCreate(data) {
    try {
        // const allowedRoles = Object.values(Enum.UserRoles);
        // if (!allowedRoles.includes(data.role)) {
        //   throw new AppError(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`, StatusCodes.BAD_REQUEST);
        // }
        const tender = await TenderRepo.create(data);
        return tender;
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

async function getTender(query) {
    try {
        const tender = await TenderRepo.getByFilters(query);
        return tender;
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


async function getTenderByIds(id) {
    try {
        const tender = await TenderRepo.getOneTender(id);
        return tender;
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


async function deleteTender(data) {
    try {
        const response = await TenderRepo.destroy(data.id);
        return response;
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

module.exports = { tenderCreate, getTender,deleteTender,getTenderByIds};

