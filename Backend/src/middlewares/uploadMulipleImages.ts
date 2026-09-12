import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import express,{Request, Response, NextFunction} from "express"
import asyncHandler from "express-async-handler"


dotenv.config();

//* configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
  secure:true,
});

const uploadMultiple = asyncHandler(async(req:Request ,res:Response, next:NextFunction) => {

    try{

        const images = req.files as Express.Multer.File[];

        console.log(images)
        const imagesUrl = []

        for(const image of images){

            const result  = await cloudinary.uploader.upload(image.path,{

                resource_type:"auto"
            })

            imagesUrl.push(result.secure_url)
        }

        res.locals.images = imagesUrl

        console.log(res.locals.images)

        next()

    }catch(error){
        res.status(500).send(`Server Error in uploadMultipleImages.ts - ${error}`)
    }
})

export default uploadMultiple;
