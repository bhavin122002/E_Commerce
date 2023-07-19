const jsonwebtoken = require("jsonwebtoken");
const user = require("../models/loginSchema");
const { MSG } = require("./constant");
const { errorResponse } = require("./general");
const { StatusCodes } = require("http-status-codes");

module.exports.authUser = async (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    let token = authorization.split(" ")[1];
    if (token && jsonwebtoken.verify(token, process.env.SECRET_KEY)) {
      const { id } = jsonwebtoken.verify(token, process.env.SECRET_KEY);
      req.user = await user.findById(id);
      if (!req.user)
        return res.send(
          errorResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            true,
            MSG.PLZ_REGISTER
          )
        );
      next();
    } else {
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.PLZ_LOGIN)
      );
    }
  } catch (err) {
    console.log(err);
    return res.send(
      errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.TOKEN_EMPTY)
    );
  }
};

module.exports.authRole = (...roles) => {
  return async (req, res, next) => {
    try {
      if (req.user && !roles.includes(req.user.role)) {
        return res.send(
          errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, MSG.NOT_ACCESS)
        );
      }
      next();
    } catch (err) {
      console.log(err);
      return res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  };
};
