import express from "express";
import {
  addProperty,
  getProperties,
  getProperty,
} from "../controllers/propertyControllers.js";
import { verifyJWT } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.route("/addProperty").post(
  verifyJWT,
  upload.fields([
    { name: "imageUrl", maxCount: 3 },
    { name: "videoUrl", maxCount: 1 },
  ]),
  addProperty
);
router.route("/getProperties").get(verifyJWT, getProperties);
router.route("/getProperty/:id").get(verifyJWT, getProperty);

export { router as propertyRouter };
