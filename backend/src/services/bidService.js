const { BidRepostory } = require("../repositories");
const BidRepo = new BidRepostory();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const {Enum} = require('../utils/common');
const { getWeb3Data } = require("../web3Service");


async function bidCreate(data) {
    try {
        // const allowedRoles = Object.values(Enum.UserRoles);
        // if (!allowedRoles.includes(data.role)) {
        //   throw new AppError(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`, StatusCodes.BAD_REQUEST);
        // }
        const allowedRoles = ['Contractor', 'Transporter'];
        const { web3, contract, accounts } = getWeb3Data();
      

        if (!allowedRoles.includes(data.role)) {
        throw new AppError("Only Contractors or Transporters are allowed to place bids", StatusCodes.FORBIDDEN);
        }
        const bid = await BidRepo.create(data);

        const bidHash=web3.utils.keccak256(web3.utils.toHex(JSON.stringify(bid)));
        await contract.methods.submitBid(bid.id, bidHash).send({ from: accounts[0] });


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


async function getBidByIds(id) {
    try {
        const tender = await BidRepo.getOneBid(id);
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

async function deleteBid(data) {
    try {
        const response = await BidRepo.destroy(data.id);
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

module.exports = { bidCreate,getBid,deleteBid,getBidByIds};

