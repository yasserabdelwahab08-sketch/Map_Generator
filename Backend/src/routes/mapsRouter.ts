import { Router } from "express";
import * as buildingMethods from "../controllers/mapController.js";
import upload from "../middlewares/multer.js";

const buildingRouter = Router();

buildingRouter.get("/", buildingMethods.getAllBuildings);
buildingRouter.post("/", upload.array("images", 10), buildingMethods.createBuilding);
buildingRouter.get("/:id", buildingMethods.getBuildingById);

export default buildingRouter;