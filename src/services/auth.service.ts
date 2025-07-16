import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import { IUserRepository } from "../repositories/user.repository";
import { LoginDTO, RefreshTokenDTO, RegisterDTO } from "../DTO/auth.dto";
import { IOrganizationRepository } from "../repositories/organization.repository";
import { IOrganizationService } from "./organization.service";

export interface IAuthService {
  login(dto: LoginDTO): Promise<{ accessToken: string; refreshToken: string }>;
  refreshToken(dto: RefreshTokenDTO): Promise<{ accessToken: string }>;
  register(
    dto: RegisterDTO
  ): Promise<{ phoneNumber: string; passwordHash: string }>;
}

export class AuthService implements IAuthService {
  constructor(
    private userRepository: IUserRepository,
    private organizationService: IOrganizationService,
    private jwtSecret: string = config.JWT_SECRET
  ) {}

  async login(dto: LoginDTO) {
    const user = await this.userRepository.findByPhone(dto.phoneNumber);
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) throw new Error("Invalid credentials");

    return this.generateTokens(user.id);
  }

  async register(dto: RegisterDTO) {
    const userExists = await this.userRepository.findByPhone(dto.phoneNumber);
    if (userExists) throw new Error("User already exists");

    const organizationExists =
      await this.organizationService.getOrganizationByNumber(
        dto.organizationNumber
      );
    if (!organizationExists)
      throw new Error(
        `Organization with number: ${dto.organizationNumber} not found`
      );

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const createdUser = await this.userRepository.createUser({
      phoneNumber: dto.phoneNumber,
      passwordHash,
      organizationId: organizationExists.id,
    });

    return createdUser;
  }

  async refreshToken(dto: RefreshTokenDTO) {
    // Проверяем валидность токена
    const payload = jwt.verify(dto.refreshToken, this.jwtSecret) as {
      userId: number;
    };

    // Проверяем наличие токена в БД
    const token = await this.userRepository.findRefreshToken(dto.refreshToken);
    if (!token || token.expiresAt < new Date()) {
      throw new Error("Invalid refresh token");
    }

    // Удаляем использованный токен
    await this.userRepository.deleteRefreshToken(dto.refreshToken);

    // Генерируем новую пару токенов
    return this.generateTokens(payload.userId);
  }

  private async generateTokens(userId: number) {
    const accessToken = jwt.sign({ userId }, this.jwtSecret, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId }, this.jwtSecret, {
      expiresIn: "7d",
    });
    await this.userRepository.saveRefreshToken({
      userId,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return { accessToken, refreshToken };
  }
}
