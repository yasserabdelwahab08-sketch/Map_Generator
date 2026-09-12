import { Router } from "express";
import * as buildingMethods from "../controllers/mapController.js";

const buildingRouter = Router();

buildingRouter.get("/", buildingMethods.getAllBuildings);
buildingRouter.get("/:id", buildingMethods.getBuildingById);

export default buildingRouter;