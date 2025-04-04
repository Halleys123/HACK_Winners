const CrudRepositery = require("./crud");
const { TenderDetail, User } = require("../models");
const { Op } = require("sequelize");

class TenderRepository extends CrudRepositery {
  constructor() {
    super(TenderDetail);
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
