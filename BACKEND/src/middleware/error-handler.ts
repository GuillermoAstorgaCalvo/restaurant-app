import { ErrorRequestHandler } from "express";
import { ValidationError as SequelizeValidationError } from "sequelize";
import { ZodError } from "zod";
import { AppError } from "../lib/errors";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof SequelizeValidationError) {
    return res.status(400).json({
      error: "Sequelize Validation Error",
      details: err.errors.map((e) => ({
        field: e.path ?? "unknown",
        message: e.message,
      })),
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Zod Validation Error",
      details: err.errors.map((e) => ({
        field: e.path.join(".") || "unknown",
        message: e.message,
      })),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode || 500).json({
      error: err.name,
      message: err.message,
      details: err.details || null,
    });
  }

  if ("statusCode" in err && typeof err.statusCode === "number") {
    return res.status(err.statusCode).json({
      error: err.name || "Error",
      message: err.message,
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred.",
  });
};
