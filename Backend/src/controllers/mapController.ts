import { Request, Response } from "express";
import BuildingModel from "../models/Schema/buildingModel.js";

export const getAllBuildings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const buildings = await BuildingModel.find();

    res.status(200).json({
      status: 200,
      message: "Displayed all buildings maps successfully",
      success: true,
      data: buildings,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Server Error: Unable to fetch buildings",
      error: error
    });
  }
};

export const getBuildingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const building = await BuildingModel.findById(id)

    // If no building was found with the provided ID
    if (!building) {
      res.status(404).json({
        status:404,
        success: false,
        message: `Building not found with ID: ${id}`,
      });
      return;
    }

    res.status(200).json({
      status:200,
      message: `Displayed building with ID [${id}] successfully!`,  
      success: true,
      data: building,
    });
  } catch (error) {
    res.status(500).json({
      status:500,  
      success: false,
      message: "Server Error: Unable to fetch building",
      error: error
    });
  }
};
