import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";
export interface CloudinaryUploadResult {
  url: string;
  cloud_id: string;
}

export const uploadToCloudinary = async (
  filePath: string,
  folder: string = "building_floors"
): Promise<CloudinaryUploadResult> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
    });

    // Clean up temporary local file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return { url: result.secure_url, cloud_id: result.public_id };
  } catch (error) {
    // Ensure temporary file is removed if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Cloudinary Upload Error: ${(error as Error).message}`);
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  const result = await cloudinary.uploader.destroy(publicId);
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(`Cloudinary delete failed: ${result.result}`);
  }
  return result;
};