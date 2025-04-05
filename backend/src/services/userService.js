const { UserRepository } = require("../repositories");
const UserRepo = new UserRepository();
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const {Enum} = require('../utils/common');
const jwt = require('jsonwebtoken');
const {ServerConfig} =require("../config")
const bcrypt = require('bcrypt');


async function userCreate(data) {
    try {
        const allowedRoles = Object.values(Enum.UserRoles);
        if (!allowedRoles.includes(data.role)) {
          throw new AppError(`Invalid role. Must be one of: ${allowedRoles.join(', ')}`, StatusCodes.BAD_REQUEST);
        }
        const user = await UserRepo.create(data);
        const payload = {
            id: user.id, 
            email: data.email,
            role: data.role,
            name: data.name
          };

          const token = jwt.sign(payload, ServerConfig.JWT_SECRET, {
            expiresIn: "1d"
          });

        return { user, token };
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
function isAuthentication(token) {
    try {
        if (!token) {
            throw new AppError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const user = verifyToken(token);
        return user;
    } catch (error) {
        if (error instanceof AppError) throw error;
        if (error.name === 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function verifyToken(token) {
    try{
    return jwt.verify(token,ServerConfig.JWT_SECRET);
}catch(error){
    console.log("error in the create token",error)
    throw error
        }
}

async function userSign(data) {
    try {
        const { email, password } = data;

        const user = await UserRepo.uniqueUser(email); // implement this if not done
        if (!user) {
          throw new AppError("User not found", StatusCodes.NOT_FOUND);
        }
    
        const passwordMatch = checkPassword(password, user.password);
        if (!passwordMatch) {
          throw new AppError("Invalid credentials", StatusCodes.UNAUTHORIZED);
        }
    
        // generate JWT token
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role
        };
    
        const token = jwt.sign(payload, ServerConfig.JWT_SECRET, { expiresIn: "24h" });
    
        return {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            ethAddress: user.ethAddress,
          },
        };
          
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


function checkPassword(plainPassword, encryptedPassword) {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
}


async function getUser(query) {
    try {
        const user = await UserRepo.getByFilters(query);
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

async function deleteUser(data) {
    try {
        const response = await UserRepo.destroy(data.id);
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


module.exports = { userCreate, getUser ,deleteUser,userSign,isAuthentication};

