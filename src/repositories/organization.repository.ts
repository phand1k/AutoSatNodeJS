import { PrismaClient } from "@prisma/client";
import { Organization } from "../generated/prisma";

export interface IOrganizationRepository {
  findByNumber(number: string): Promise<Organization | null>;
  createOrganization(data: {
    number: string;
    name: string;
    fullName: string;
    pinCode: number;
  }): Promise<Organization>;
  findById(id: number): Promise<Organization | null>;
}

export class OrganizationRepository implements IOrganizationRepository {
  constructor(private prisma: PrismaClient) {}

  async findByNumber(number: string) {
    return this.prisma.organization.findUnique({ where: { number } });
  }

  async findById(id: number) {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async createOrganization(data: {
    number: string;
    name: string;
    fullName: string;
    pinCode: number;
  }) {
    return this.prisma.organization.create({ data });
  }
}
