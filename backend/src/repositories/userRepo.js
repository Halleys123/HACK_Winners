const CrudRepositery = require("./crud");

const { User } = require("../models");

const { Op } = require("sequelize");
class UserRepository extends CrudRepositery {
    constructor() {
        super(User);
    }

    async getByFilters(query) {
        const where = {};

        if (query.email) {
            where.email = query.email;
        }
        if (query.name) {
            where.name = query.name;
        }

        if (query.role) {
            where.role = query.role;
        }

        if (query.startDate && query.endDate) {
            where.createdAt = {
                [Op.between]: [new Date(query.startDate), new Date(query.endDate)]
            };
        }

        return await this.model.findAll({ where });
    }
    async uniqueUser(email){
        const res=await this.model.findOne({ where: {email:email } })
        return res;
    }
}
module.exports = UserRepository;