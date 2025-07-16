// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as { userId: number };
    req.userId = payload.userId;
    next();
  } catch {
    res.sendStatus(403);
  }
}
