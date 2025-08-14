// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err instanceof ApiError && err.statusCode) || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
