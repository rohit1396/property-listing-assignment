import UserModel from "../models/userSchema.js";
import bcryptjs from "bcryptjs";

const generateToken = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    const accessToken = await user.generateAccessToken();
    return accessToken;
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "something went wrong while generating token",
    });
  }
};

const registerUser = async (req, res) => {
  const { userName, email, password, confirm_password } = req.body;

  try {
    if (!userName || !email || !password || !confirm_password) {
      res.status(400).json({
        success: false,
        err: "Please fill all the required fields",
      });
    }

    const userExists = await UserModel.findOne({ email: email });

    if (userExists) {
      res.status(409).json({
        success: false,
        err: "User Already Exists",
      });
    }

    if (password !== confirm_password) {
      res.status(401).json({
        success: false,
        err: "password Not matching",
      });
    }

    const registerUser = new UserModel({
      userName: userName,
      email: email,
      password: password,
      confirm_password: confirm_password,
    });

    const saveUser = await registerUser.save();

    const getUser = await UserModel.findOne({ email: email }).select(
      "-password -confirm_password"
    );

    if (!getUser) {
      res.status(500).json({
        success: false,
        err: "something went wrong while registering user",
      });
    }

    return res.status(201).json({
      success: true,
      user: getUser,
      message: "user created succesfully",
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        success: false,
        err: "email or password is missing",
      });
    }

    const getUser = await UserModel.findOne({ email: email });

    if (!getUser) {
      res.status(404).json({
        success: false,
        err: "User Does Not exist",
      });
    }

    const isMatch = await bcryptjs.compare(password, getUser.password);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        err: "Invalid Credentials",
      });
    }

    const accessToken = await generateToken(getUser._id);
    console.log("Token : ", accessToken);

    const loggedInUser = await UserModel.findById(getUser._id).select(
      "-password -confirm_password"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      success: true,
      data: loggedInUser,
      accessToken,
      message: "user LoggedIn Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

const logoutUser = async (req, res) => {
  console.log(req.user);
  try {
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).clearCookie("accessToken", options).json({
      success: true,
      message: "user LoggedOut Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export { registerUser, loginUser, logoutUser };
