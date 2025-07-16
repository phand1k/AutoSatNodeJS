import { Request, Response } from "express";
import { IAuthService } from "../services/auth.service";
import { LoginDTO, RefreshTokenDTO, RegisterDTO } from "../DTO/auth.dto";
import { IUserService } from "../services/user.service";
export class AuthController {
  constructor(
    private authService: IAuthService,
    private userService: IUserService
  ) {}

  async login(req: Request, res: Response) {
    try {
      const tokens = await this.authService.login(req.body as LoginDTO);
      res.json(tokens);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const tokens = await this.authService.refreshToken(
        req.body as RefreshTokenDTO
      );
      res.json(tokens);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }

  async updatePassword(req: Request, res: Response) {
    console.log();
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.authService.register(req.body as RegisterDTO);
      res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }
}
