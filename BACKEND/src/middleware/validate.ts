import { RequestHandler } from "express";
import { ZodSchema } from "zod";
import { ValidationError } from "../lib/errors";

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    schema
      .parseAsync(req.body) // Pass only req.body for validation
      .then((validated) => {
        req.body = validated; // Replace req.body with validated data
        next();
      })
      .catch((error) => {
        if (error.errors) {
          const formattedErrors = error.errors.map((e: any) => ({
            path: e.path.join("."),
            message: e.message,
          }));
          next(new ValidationError(formattedErrors));
        } else {
          next(error);
        }
      });
  };
};
