import { ErrorRequestHandler } from "express";
import errorObj, { defaultError } from "../utils/errorObject";
import ErrorResponse from "../utils/errorResponse";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = { ...err };

  // console.log("Error Handler get called");
  // console.log(err);

  // Some error
  // if(err.name === "someError") {
  //   const message = `Resource not found with id of ${err.value}`;
  //   error = new ErrorResponse(message, 404)
  // }

  // Record to do something not found
  if (err.code === "P2025") {
    const errNotFoundObj = errorObj(404, "notFound", err.meta.cause);
    error = new ErrorResponse(errNotFoundObj, 404);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.errObj || defaultError,
  });
};

export default errorHandler;
