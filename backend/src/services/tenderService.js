const { TenderRepository } = require("../repositories");
const TenderRepo = new TenderRepository();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const {Enum} = require('../utils/common');
const { json } = require("sequelize");
const { getWeb3Data } = require("../web3Service");


async function tenderCreate(data) {
    try {
        // const allowedRoles = Object.values(Enum.UserRoles);
        // if (!allowedRoles.includes(data.role)) {
        //   throw new AppError(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`, StatusCodes.BAD_REQUEST);
        // }

        const { web3, contract, accounts } = getWeb3Data();

        if (!contract || !accounts) {
          throw new AppError("Blockchain not initialized", StatusCodes.INTERNAL_SERVER_ERROR);
        }

        const tender = await TenderRepo.create(data);
        const tenderHash=web3.utils.keccak256(web3.utils.toHex(JSON.stringify(tender)));
        await contract.methods.createTender(tender.id, tenderHash).send({ from: accounts[0] });

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

