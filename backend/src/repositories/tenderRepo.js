const CrudRepositery = require("./crud");
const { TenderDetail, User } = require("../models");
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

class TenderRepository extends CrudRepositery {
  constructor() {
    super(TenderDetail);
  }



  async getOneTender(id) {
    const response = await this.model.findByPk(id, {
      include: [
        {
          model: User,
          as: "issuer",
          attributes: ["id", "name", "email", "role"],
        },
      ],
    });
  
    if (!response) {
      throw new AppError("Not able to find the resource", StatusCodes.NOT_FOUND);
    }
  
    return response;
  }
  

  async getByFilters(query) {
    const where = {};

    // Filter by title (optional)
    if (query.title) {
      where.title = { [Op.iLike]: `%${query.title}%` }; // PostgreSQL: case-insensitive search
    }

    // Filter by category
    if (query.category) {
      where.category = query.category;
    }

    // Filter by status
    if (query.status) {
      where.status = query.status;
    }

    // Filter by release date range
    if (query.startDate && query.endDate) {
      where.releaseDate = {
        [Op.between]: [new Date(query.startDate), new Date(query.endDate)],
      };
    }

    // Include associated User (createdBy)
    return await this.model.findAll({
      where,
      include: [
        {
          model: User,
          as: "issuer", // This alias must match the one used in the association
          attributes: ["id", "name", "email", "role"], // send only necessary fields
        },
      ],
    });
  }
}

module.exports = TenderRepository;
