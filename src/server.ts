import express, { Router } from "express";
import { AppContainer } from "./app";
import { AuthController } from "./controllers/auth.controller";
import { validationMiddleware } from "./middlewares/validation.middleware";
import { LoginDTO, RefreshTokenDTO, RegisterDTO } from "./DTO/auth.dto";
import config from "./config";
import { authMiddleware } from "./middlewares/auth.middleware";
import { UserController } from "./controllers/user.controller";
import { createAuthRouter } from "./routes/auth.routes";
import { createProfileRouter } from "./routes/profile.routes";
import { createOrganizationRoute } from "./routes/organization.routes";

async function startServer() {
  const app = await AppContainer.init();
  const authController = AppContainer.authController;
  const userController = AppContainer.userController;
  const organizationController = AppContainer.organizationController;
  app.use(express.json());

  app.use("/auth", createAuthRouter(authController));
  app.use("/profile", createProfileRouter(userController));
  app.use("", createOrganizationRoute(organizationController));
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });

  process.on("SIGINT", async () => {
    await AppContainer.close();
    process.exit(0);
  });
}

startServer().catch(console.error);
