const { UserRepository } = require("../repositories");
const UserRepo = new UserRepository();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const {Enum} = require('../utils/common');


async function userCreate(data) {
    try {
        const allowedRoles = Object.values(Enum.UserRoles);
        if (!allowedRoles.includes(data.role)) {
          throw new AppError(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`, StatusCodes.BAD_REQUEST);
        }
        const user = await UserRepo.create(data);
        return user;
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




async function bulkUser() {
    try {
        const parsedData = await CsvParser.readFile(); // Read and parse CSV data
        const results = []; // Array to store success and error results

        const StudentTypeMap = {
            "bachelor": 1,
            "master": 2,
            "dualdegree": 3,
        };

        // Loop through each entry in the parsed data
        for (const entry of parsedData) {
            try {
                
                // Extract the 'programmEnroled' field from the entry and normalize it
                const programmEnroled = entry.programmEnroled.toLowerCase().trim();
                
                // Map 'programmEnroled' to the corresponding ID
                const typeId = StudentTypeMap[programmEnroled];
                console.log("typeId is", typeId);

                // Assign the mapped ID back to 'programmEnroled'
                entry.programmEnroled = typeId;

                // Create a new user with the mapped data
                const user = await StudentRepo.create(entry);
                results.push({ status: 'success', data: user });
            } catch (error) {
                // If there is an error, store the error message
                results.push({ status: 'error', error: error.message });
            }
        }

        return results; // Return the array of results
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else {
            throw new AppError(
                "Cannot create the student object in bulk",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}


async function getUser(query) {
    try {
        let custumFilter = {};
        if (query.year) {
            custumFilter.year = query.year;
        }
        if (query.programmEnroled) {
            custumFilter.programmEnroled = query.programmEnroled;
        }

        const user = await StudentRepo.getAllStudents(custumFilter);
        return user;
    } catch (error) {
        console.log(error);
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        } else {
            throw new AppError(
                "Cannot get the student object",
                StatusCodes.INTERNAL_SERVER_ERROR
            );
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
module.exports = { userCreate, getUser, getUniqueYears,bulkUser ,deleteUser,UpdateUser};

