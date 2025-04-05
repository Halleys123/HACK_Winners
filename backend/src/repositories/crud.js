const { logger } = require("../config");
const { CsvParser } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
class CrudRepositery {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            console.log("response from repo",response)
            return response;
            
            
        } catch (error) {
            console.log(error);
            throw new AppError(
                error.message
            );
        }
    }

    async getTopN(limit) {
        try {
          const response = await this.model.findAll({
            limit:parseInt(limit, 10),
            order: [['id', 'DESC']]  // Adjust the order by field as needed
          });
          console.log(`Retrieved ${response.length} response`);
          return response;
        } catch (error) {
          throw new AppError('Error retrieving top response', 500, error);
        }
      }
    

    async destroy(id) {
        try {
            const response = await this.model.destroy({
                where: {id},
            });
            if (!response) {
                throw new AppError(
                    "Not able to delete the resource",
                    StatusCodes.NOT_FOUND
                );
            }
            return response;
        } catch (error) {
            console.log(error, "the error in the repository layer");
        }
    }

    async get(id) {
        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError(
                "Not able to find the resource",
                StatusCodes.NOT_FOUND
            );
        }
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();

        return response;
    }

    async upDate(id, data) {
        console.log("Data being updated:", data);
        const response = await this.model.update(data, {
            where: {
                id: id,
            },
        });
        
        if (response[0] === 0) {
            return null; // No rows were updated
        }
    
        // Fetch the updated record
        const updatedRecord = await this.model.findOne({ where: { id: id } });
        console.log("Updated record:", updatedRecord);
        return updatedRecord;
    }
    
    async findOne(query) {
        return await this.model.findOne(query);
    }


    async getAllFiltered(where = {}, options = {}) {
        try {
            const response = await this.model.findAll({ where, ...options });
            return response;
        } catch (error) {
            console.error("Error in getAllFiltered:", error);
            throw error;
        }
    }    
}

module.exports = CrudRepositery;
