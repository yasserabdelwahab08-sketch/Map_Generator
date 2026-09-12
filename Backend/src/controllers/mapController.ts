import { Request, Response } from "express";
import BuildingModel from "../models/Schema/buildingModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.util.js";

export const getAllBuildings = async (
  req: Request,
  res: Response,
) => {
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

export const getBuildingById = async (req: Request, res: Response) => {
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

export const createBuilding = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, mapCreator, floorsData, nodesData } = req.body;
    const files = req.files as Express.Multer.File[];

    // Validate essential fields
    if (!name || !mapCreator) {
      res.status(400).json({
        success: false,
        message: "Please provide both 'name' and 'mapCreator'",
      });
      return;
    }

    // Parse JSON strings sent via multipart/form-data
    const parsedFloors: Array<{ id: string }> = floorsData ? JSON.parse(floorsData) : [];
    const parsedNodes = nodesData ? JSON.parse(nodesData) : [];

    // Map uploaded files to floor sub-documents with Cloudinary URLs
    const floorsWithImages = [];

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Upload temporary file to Cloudinary
        const imageUrl = await uploadToCloudinary(file.path, "floors");

        // Associate uploaded image with floor metadata
        const floorMetadata = parsedFloors[i] || { id: `floor_${i + 1}` };

        floorsWithImages.push({
          id: floorMetadata.id,
          image: imageUrl,
        });
      }
    }

    // Save Building to MongoDB
    const newBuilding = await BuildingModel.create({
      name,
      mapCreator,
      floors: floorsWithImages,
      nodes: parsedNodes,
    });

    res.status(201).json({
      success: true,
      message: "Building created successfully",
      data: newBuilding,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create building",
      error: error.message,
    });
  }
};