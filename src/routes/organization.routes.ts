import { Router } from "express";
import { OrganizationController } from "../controllers/organization.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateOrganizationDTO } from "../DTO/organization.dto";

export const createOrganizationRoute = (
  organizationController: OrganizationController
) => {
  const router = Router();

  // POST /organizations
  router.post(
    "/organizations",
    validationMiddleware(CreateOrganizationDTO),
    (req, res) => organizationController.create(req, res)
  );

  // ✅ GET /organizations/:id
  router.get("/organizations", (req, res) =>
    organizationController.findByNumber(req, res)
  );

  router.get("/organizations/:id", (req, res) =>
    organizationController.findById(req, res)
  );

  return router;
};
