import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { LoginDTO, RegisterDTO, RefreshTokenDTO } from "../DTO/auth.dto";

// Фабричная функция для создания роутера
export const createAuthRouter = (authController: AuthController) => {
  return Router()
    .post("/login", validationMiddleware(LoginDTO), (req, res) =>
      authController.login(req, res)
    )
    .post("/register", validationMiddleware(RegisterDTO), (req, res) =>
      authController.register(req, res)
    )
    .post("/refresh", validationMiddleware(RefreshTokenDTO), (req, res) =>
      authController.refreshToken(req, res)
    );
};
