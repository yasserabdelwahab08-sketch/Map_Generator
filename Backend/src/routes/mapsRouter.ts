import { Router } from "express";
import express from "express"
import uploadMultiple from "../middlewares/uploadMulipleImages.js";
import upload from "../middlewares/multer.js";

const router = Router()

router.post("/image",upload.single("image"),uploadImage)

export default router