import { PrismaClient } from "../src/generated/prisma";
import { UserRepository } from "./repositories/user.repository";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import express from "express";
import config from "./config";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { OrganizationController } from "./controllers/organization.controller";
import { OrganizationRepository } from "./repositories/organization.repository";
import { OrganizationService } from "./services/organization.service";
export class AppContainer {
  private static prisma = new PrismaClient();

  static get userRepository() {
    return new UserRepository(this.prisma);
  }

  static get organizationRepository() {
    return new OrganizationRepository(this.prisma);
  }

  static get organizationService() {
    return new OrganizationService(this.organizationRepository);
  }

  static get userService() {
    return new UserService(this.userRepository);
  }

  static get authService() {
    return new AuthService(this.userRepository, this.organizationService);
  }

  static get organizationController() {
    return new OrganizationController(this.organizationService);
  }

  static get userController() {
    return new UserController(this.userService);
  }

  static get authController() {
    return new AuthController(this.authService, this.userService);
  }

  static async init() {
    await this.prisma.$connect();
    return express();
  }

  static async close() {
    await this.prisma.$disconnect();
  }
}
