import { NextFunction, Request, Response } from "express";
import { ZodTypeAny, ZodError } from "zod";

export const validationRequest = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = req.body.data ? JSON.parse(req.body.data) : req.body;
      await schema.parseAsync({
        body: parseBody,
        params: req.params,
        query: req.query,
      });
      req.body = parseBody;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors,
        });
      }
      next(error);
    }
  };
};

export default validationRequest;

