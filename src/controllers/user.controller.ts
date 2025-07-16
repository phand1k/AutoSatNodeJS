// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { IUserService } from "../services/user.service";

// Объявите интерфейс для расширенного Request
interface AuthenticatedRequest extends Request {
  userId?: number;
}

export class UserController {
  constructor(private userService: IUserService) {}

  async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) throw new Error("Unauthorized");

      const user = await this.userService.getUserById(userId);
      res.json({
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }

  async updateUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) throw new Error("Unauthorized");

      const updatedUser = await this.userService.updateUser(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
}
