import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    videoUrl: [
      {
        type: String,
        required: true,
      },
    ],
    ownedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
  },
  {
    timestamps: true,
  }
);

const PropertyModel = mongoose.model("PropertyModel", propertySchema);

export default PropertyModel;
