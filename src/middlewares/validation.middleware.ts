import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { RequestHandler } from "express";

export function validationMiddleware(type: any): RequestHandler {
  return async (req, res, next) => {
    try {
      const obj = plainToInstance(type, req.body);
      const validationErrors = await validate(obj);

      if (validationErrors.length > 0) {
        const messages = validationErrors
          .map((error) => Object.values(error.constraints || {}))
          .join(", ");
        return res.status(400).json({ error: messages });
      }

      req.body = obj;
      next();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ error: errorMessage });
    }
  };
}
