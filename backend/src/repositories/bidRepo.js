const CrudRepository = require("./crud");
const { Bid, TenderDetail, User } = require("../models");
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class BidRepository extends CrudRepository {
  constructor() {
    super(Bid);
  }


  async getOneBid(id) {
    const response = await this.model.findByPk(id, {
        include: [
            {
              model: TenderDetail,
              as: "tender",
              attributes: ["id", "title", "tenderNumber", "estimatedCost", "category"]
            },
            {
              model: User,
              as: "contractor",
              attributes: ["id", "name", "email", "ethAddress"]
            }
          ]
    });
  
    if (!response) {
      throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
    }
  
    return response;
  }
  

  async getByFilters(query) {
    const where = {};

    if (query.tenderId) {
      where.tenderId = query.tenderId;
    }

    if (query.contractorId) {
      where.contractorId = query.contractorId;
    }

    if (query.isApproved !== undefined) {
      where.isApproved = query.isApproved === "true";
    }

    if (query.minPrice && query.maxPrice) {
      where.bidPrice = {
        [Op.between]: [Number(query.minPrice), Number(query.maxPrice)],
      };
    }

    if (query.startDate && query.endDate) {
      where.createdAt = {
        [Op.between]: [new Date(query.startDate), new Date(query.endDate)],
      };
    }

    return await this.model.findAll({
      where,
      include: [
        {
          model: TenderDetail,
          as: "tender",
          attributes: ["id", "title", "tenderNumber", "estimatedCost", "category"]
        },
        {
          model: User,
          as: "contractor",
          attributes: ["id", "name", "email", "ethAddress"]
        }
      ]
    });
  }
}

module.exports = BidRepository;
