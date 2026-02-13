import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/data.uri.js";
import cloudinary from "../utils/cloudinary.js";
// import { cloneElement } from "react";

export const registerUser = async (req, res) => {
  // console.log("hejjo")
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    // console.log(fullname, email, password, phoneNumber, role)

    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        message: "All field are required",
        success: false,
      });
    }

    const file = req.file;
    // console.log("file", file)
    let cloudResponse = null;

    if (file) {
      const fileUri = getDataUri(file);
      // console.log(fileUri)
      // fileUri will be null only if file is null
      if (fileUri) { // ⚠ check fileUri
        const type = file.mimetype.startsWith("image") ? "image" : "raw";
        cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
          resource_type: type,
          folder: type === "image" ? "profile_photos" : "resumes",
        });

      }
    }

    // console.log(cloudResponse)

    console.log(fullname, email, password, phoneNumber, role, file)



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

    // const user = await UserModel.create({
    //   fullname,
    //   email,
    //   password: hashedPassword,
    //   phoneNumber,
    //   role,
    //   profile: {
    //     profilePhoto: cloudResponse ? cloudResponse.secure_url : ""
    //   }


    // });



    const user = await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudResponse?.secure_url || "",
        bio: "",
        skills: [],
        resume: "",
        resumeOriginalName: ""
      }
    });

    res.status(201).json({
      message: "user Registered Successfully",
      success: true,
      // user: {
      //   id: user._id,
      //   fullname: user.fullname,
      //   email: user.email,
      //   role: user.role,
      // },
    });
  } catch (error) {
    console.log(error);
  }
};



export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // console.log(req.body)

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

    // res.status(201).json({
    //   message: "User Login Successfully",
    //   success: true,
    //   user: {
    //     _id: user._id,
    //     fullname: user.fullname,
    //     email: user.email,
    //     role: user.role,
    //     phoneNumber: user.phoneNumber,
    //     userProfile: user.userProfile,
    //   },
    // });


    res.status(201).json({
      message: "User Login Successfully",
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profile: {
          profilePhoto: user.profile?.profilePhoto || '',
          // <-- ensure proper profile object
          bio: user.profile?.bio || '',
          skills: user.profile?.skills || [],
          resume: user.profile?.resume || '',
          resumeOriginalName: user.profile?.resumeOriginalName || '',
        }
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





// export const UpdateProfile = async (req, res) => {
//   console.log("hello")
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     // console.log(fullname, email, phoneNumber, bio, skills)

//     // const file = req.file;
//     // let cloudResponse
//     // if (file) {

//     //   const fileUri = getDataUri(file)
//     //   cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//     //     resource_type: "raw",
//     //     folder: "resumes",
//     //   })

//     // }




//     const file = req.file;
//     if (file) {
//       const fileUri = getDataUri(file);

//       const type = file.mimetype.startsWith("image") ? "image" : "raw";

//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: type,
//         folder: type === "image" ? "profile_photos" : "resumes",
//       });

//       if (type === "image") {
//         // Update profile photo
//         user.profile.profilePhoto = cloudResponse.secure_url;
//       } else {
//         // Update resume
//         user.profile.resume = cloudResponse.secure_url;
//         user.profile.resumeOriginalName = file.originalname;
//       }
//     }

//     // let skillsArray = [];
//     // if (skills) {
//     //   const skillsArray = skills.split(",");
//     // }



//     const userId = req.id;
//     const user = await UserModel.findById(userId);

//     if (!user) {
//       return res.status(400).json({
//         message: "User Not found",
//         success: false,
//       });
//     }

//     let skillsArray = [];
//     if (skills) skillsArray = skills.split(",").map(s => s.trim());
//     if (skills) user.profile.skills = skillsArray;


//     //Updating data

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skillsArray;

//     // if (cloudResponse) {
//     //   user.profile.resume = cloudResponse.secure_url
//     //   user.profile.resumeOriginalName = file.originalname
//     // }

//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url
//       user.profile.resumeOriginalName = file.originalname
//     }


//     await user.save();

//     res.status(200).json({
//       message: "user Updated Successfully",
//       success: true,
//       user: {
//         id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         role: user.role,
//         profile: user.profile,
//         phoneNumber: user.phoneNumber

//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


export const UpdateProfile = async (req, res) => {
  console.log("hello")
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    console.log(file)
    const userId = req.id;
    console.log(userId)
    const user = await UserModel.findById(userId);

    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    // Convert skills string to array
    if (skills) user.profile.skills = skills.split(",").map(s => s.trim());

    // Update basic info
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;

    // ✅ Handle file upload (profile photo or resume)
  


  let cloudResponse = null; // 👈 define outside

if (file && file.size > 0) {
  const fileUri = getDataUri(file);
  if (fileUri) {
    const type = file.mimetype.startsWith("image") ? "image" : "raw";
    cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: type,
      folder: type === "image" ? "profile_photos" : "resumes",
    });

    if (type === "image") {
      user.profile.profilePhoto = cloudResponse.secure_url;
    } else {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
  }
} else {
  console.log("No file uploaded or file is empty");
}


    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message || "Something went wrong" });
  }
};



