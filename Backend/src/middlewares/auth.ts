import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import BuildingModel from "../models/Schema/buildingModel.js";
export interface AuthedRequest extends Request {
  userId?: string;
}

export const verifyToken = (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

    if (!token) {
      res.status(401).json({ status: 401, success: false, message: "Authentication token is missing" });
      return;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ status: 401, success: false, message: "Invalid or expired token" });
  }
};



export const verifyIdentity = async (req: AuthedRequest, res: Response, next: NextFunction) => {

  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ status: 401, success: false, message: "Authentication token is missing" });
    return;
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
  req.userId = payload.id;


  try {
    const { id } = req.params;

    const building = await BuildingModel.findById(id);

    if (!building) {
      res.status(404).json({
        status: 404,
        success: false,
        message: `Building not found with ID: ${id}`,
      });
      return;
    }

    const creatorId = building.mapCreator._id.toString();
    if (creatorId !== payload.id) {
      res.status(403).json({ status: 403, success: false, message: "Forbidden: You do not own this building" });
      return;
    }
    next();

  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error: Unable to fetch building",
      error: error
    });
  }


};




export default { verifyToken, verifyIdentity };
