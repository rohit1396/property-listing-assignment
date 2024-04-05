import express from "express";

const router = express.Router();

router.route("/addProperty").post();
router.route("/getProperties").get();
router.route("/getProperty").get();

export { router as propertyRouter };
