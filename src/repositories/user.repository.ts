import { PrismaClient } from "@prisma/client";
import { User, Token } from "../generated/prisma";

export interface IUserRepository {
  findByPhone(phoneNumber: string): Promise<User | null>;

  createUser(data: {
    phoneNumber: string;
    passwordHash: string;
    organizationId: number;
  }): Promise<User>;

  saveRefreshToken(data: {
    userId: number;
    token: string;
    expiresAt: Date;
  }): Promise<void>;

  findRefreshToken(token: string): Promise<Token | null>;
  deleteRefreshToken(token: string): Promise<void>;

  findById(id: number): Promise<User | null>;
  updateUser(id: number, data: { email?: string }): Promise<User>;
}

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: number, data: { email?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async saveRefreshToken(data: {
    userId: number;
    token: string;
    expiresAt: Date;
  }) {
    await this.prisma.token.create({
      data: {
        token: data.token,
        userId: data.userId,
        expiresAt: data.expiresAt,
      },
    });
  }

  async findRefreshToken(token: string) {
    return this.prisma.token.findUnique({
      where: { token },
    });
  }

  async deleteRefreshToken(token: string) {
    await this.prisma.token.delete({
      where: { token },
    });
  }

  async findByPhone(phoneNumber: string) {
    return this.prisma.user.findUnique({ where: { phoneNumber } });
  }

  async createUser(data: {
    phoneNumber: string;
    passwordHash: string;
    organizationId: number;
  }) {
    return this.prisma.user.create({ data });
  }
}
