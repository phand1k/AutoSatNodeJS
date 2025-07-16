import { User } from "../generated/prisma";

declare global {
  namespace Express {
    export interface Request {
      userId?: number;
      user?: User;
    }
  }
}
