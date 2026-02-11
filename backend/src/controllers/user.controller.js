import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;

    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "All field are required",
        success: false,
      });
    }

    const isUserAlreadyExist = await UserModel.findOne({
      email,
    });

    if (isUserAlreadyExist) {
      return res.status(400).json({
        message: "User already exist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    res.status(201).json({
      message: "user Registered Successfully",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "all field are required",
        success: false,
      });
    }

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist current role",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      message: "User Login Successfully",
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        userProfile: user.userProfile,
      },
    });
  } catch (error) {
    console.log(error);
  }
};





export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};





export const UpdateProfile = async (req, res) => {
  console.log("hello")
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    console.log(fullname, email, phoneNumber, bio, skills )

    const file = req.file;

    // if(!fullname||!email||!phoneNumber||!bio||!skills){
    //     return res.status(400).json({
    //         message:"all field are required",
    //         success:false
    //     })
    // }

    let skillsArray;
    if (skills) {
      const skillsArray = skills.split(",");
    }
    const userId = req.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User Not found",
        success: false,
      });
    }

    //Updating data

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills;

    await user.save();

    res.status(200).json({
      message: "user Updated Successfully",
      success: true,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        profile: user.profile,
        
      },
    });
  } catch (error) {
    console.log(error);
  }
};



