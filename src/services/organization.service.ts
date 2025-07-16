import { IOrganizationRepository } from "../repositories/organization.repository";
import { CreateOrganizationDTO } from "../DTO/organization.dto";
import { Organization } from "../generated/prisma";

export interface IOrganizationService {
  getOrganizationByNumber(number: string): Promise<Organization | null>;
  getOrganizationById(id: number): Promise<Organization | null>;
  create(dto: CreateOrganizationDTO): Promise<{
    name: string | null;
    number: string | null;
    fullName: string | null;
    pinCode: number | null;
  }>;
}

export class OrganizationService implements IOrganizationService {
  constructor(private organizationRepository: IOrganizationRepository) {}

  async getOrganizationByNumber(number: string) {
    const organization = await this.organizationRepository.findByNumber(number);
    if (!organization) throw new Error("Organization not found");

    return organization;
  }

  async getOrganizationById(id: number) {
    const organization = await this.organizationRepository.findById(id);

    if (!organization) throw new Error(`Organization with ${id} not found`);

    return organization;
  }

  async create(dto: CreateOrganizationDTO) {
    const organization = await this.organizationRepository.createOrganization({
      name: dto.name,
      number: dto.number,
      fullName: dto.fullName,
      pinCode: dto.pinCode,
    });

    return organization;
  }
}
