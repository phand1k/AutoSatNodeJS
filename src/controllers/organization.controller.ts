import { Request, Response } from "express";
import { IAuthService } from "../services/auth.service";
import { LoginDTO, RefreshTokenDTO, RegisterDTO } from "../DTO/auth.dto";
import { IUserService } from "../services/user.service";
import { IOrganizationService } from "../services/organization.service";
import { CreateOrganizationDTO } from "../DTO/organization.dto";
import { error } from "console";
export class OrganizationController {
  constructor(private organizationService: IOrganizationService) {}

  async create(req: Request, res: Response) {
    try {
      const organization = await this.organizationService.create(
        req.body as CreateOrganizationDTO
      );

      res.json(organization);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "ID is required" });
      }

      const organization = await this.organizationService.getOrganizationById(
        Number(id)
      );

      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }

      res.json(organization);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async findByNumber(req: Request, res: Response) {
    try {
      const number = req.query.number as string;
      if (!number) {
        return res
          .status(400)
          .json({ error: "Organization number is required" });
      }
      const organization =
        await this.organizationService.getOrganizationByNumber(number);
      res.json(organization);
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: "Unknown error occurred" });
      }
    }
  }
}
