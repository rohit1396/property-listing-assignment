import { uploadOnCloudinary } from "../utils/cloudinary.js";
import PropertyModel from "../models/propertySchema.js";

const addProperty = async (req, res) => {
  const { email, address, phone } = req.body;
  const imagePathOne = req.files?.imageUrl[0]?.path;
  const imagePathTwo = req.files?.imageUrl[1]?.path;
  const imagePathThree = req.files?.imageUrl[2]?.path;
  const videoPath = req.files?.videoUrl[0]?.path;

  try {
    if (!email || !address || !phone) {
      res.status(400).json({
        success: false,
        err: "Fill all the required fields",
      });
    }

    if (!imagePathOne) {
      res.status(400).json({
        success: false,
        err: "Fill all the required fields",
      });
    }

    const imageFileOne = await uploadOnCloudinary(imagePathOne);

    const imageFileTwo = await uploadOnCloudinary(imagePathTwo);

    const imageFileThree = await uploadOnCloudinary(imagePathThree);

    if (!videoPath) {
      res.status(400).json({
        success: false,
        err: "Fill all the required fields",
      });
    }

    const videoFile = await uploadOnCloudinary(videoPath);

    const property = new PropertyModel({
      email: email,
      address: address,
      phone: phone,
      imageUrl: [
        imageFileOne.url,
        imageFileTwo?.url || "",
        imageFileThree?.url || "",
      ],
      videoUrl: videoFile.url,
      userOwner: req.user._id,
    });

    const saveProperty = await property.save();

    if (!saveProperty) {
      res.status(500).json({
        success: false,
        err: "something went wrong while adding property",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Property addedd succesfully",
      propertyDetails: saveProperty,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProperties = async (req, res) => {
  try {
    const getAllProperties = await PropertyModel.find();

    if (!getAllProperties) {
      return res.status(404).json({
        status: false,
        message: "No Properties to show, add some",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Properties Fetched Successfully",
      properties: getAllProperties,
    });
  } catch (err) {
    console.log(err);
  }
};

const getProperty = async (req, res) => {
  const _id = req.params.id;

  try {
    const getSingleProperty = await PropertyModel.findById(_id);

    if (!getSingleProperty) {
      return res.status(404).json({
        status: false,
        message: "Property Not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Property found",
      property: getSingleProperty,
    });
  } catch (err) {
    console.log(err);
  }
};

export { addProperty, getProperties, getProperty };
