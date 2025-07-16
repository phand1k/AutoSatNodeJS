import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const createProfileRouter = (userController: UserController) => {
  return Router().get("/me", authMiddleware, (req, res) =>
    userController.getCurrentUser(req, res)
  );
};
