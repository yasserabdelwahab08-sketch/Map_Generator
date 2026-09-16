import { Router } from "express";
import * as buildingMethods from "../controllers/mapController.js";
import upload from "../middlewares/multer.js";
import { verifyToken, verifyIdentity } from "../middlewares/auth.js";

const buildingRouter = Router();

buildingRouter.get("/", buildingMethods.getAllBuildings);
buildingRouter.get("/:id", buildingMethods.getBuildingById);
buildingRouter.get("/:id/path", buildingMethods.getBuildingPath);
buildingRouter.post("/", verifyToken, upload.array("images", 10), buildingMethods.createBuilding);
buildingRouter.delete("/:id", verifyToken, verifyIdentity, buildingMethods.deleteBuilding);


export default buildingRouter;
