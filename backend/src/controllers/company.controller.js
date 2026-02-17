import mongoose from "mongoose";
import { Company } from "../models/company.model.js";
import getDataUri from "../utils/data.uri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({
      name: companyName,
    });

    if (company) {
      return res.status(400).json({
        message: "You can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered  Successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
  }
};








export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });

    if (!companies) {
      return res.status(404).json({
        message: "Companies not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "companies fetched Successfully",
      success: true,
      companies
    });
  } catch (error) {
    console.log(error);
  }
};

// export const getCompanyById = async (req, res) => {
//   console.log("hello")
//   try {
//     const companyId = req.params.id;
//     console.log(companyId)

//     const company = await Company.findById(companyId );
//     console.log("company",company)
//     if (!companyId) {
//       return res.status(404).json({
//         message: "Company not found",
//         success: false,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };


// import { Company } from "../models/company.model.js";

export const getCompanyById = async (req, res) => {
  try {
    // 1️⃣ Get companyId from params
    let companyId = req.params.id;
    // console.log("RAW companyId:", JSON.stringify(companyId));

    // 2️⃣ Remove extra spaces and newlines
    companyId = companyId.replace(/\s/g, "");
    // console.log("CLEAN companyId:", JSON.stringify(companyId));

    // 3️⃣ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid company ID",
      });
    }

    // 4️⃣ Find company by ID
    const company = await Company.findById(companyId);

    // 5️⃣ Check if company exists
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // 6️⃣ Send success response
    return res.status(200).json({
      success: true,
      company,
    });

  } catch (error) {
    console.log("🔥 getCompanyById Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// export const UpdateCompany =async (req,res)=>{
//   console.log("hello")

//     const {name,description,website,location} = req.body

//     const updateData = {name,description,website,location}

//     const company = await Company.findByIdAndUpdate(
//         req.params.id,
//         updateData,
//         {new:true}
//     )

//     if(!company){
//         return res.status(404).json({
//             message :"Company not found",
//             success:false
//         })
//     }
//     return res.status(201).json({
//         message:"Company information Update Successfully",
//         success:true
//     })
// }


export const UpdateCompany = async (req, res) => {
  try {
    // Get companyId from params
    let companyId = req.params.id;

    // Remove spaces/newlines
    companyId = companyId.replace(/\s/g, "");

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({ success: false, message: "Invalid company ID" });
    }

    const { name, description, website, location } = req.body;

    const file = req.file
    const fileUri = getDataUri(file)
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    const logo = cloudResponse.secure_url

    const updateData = { name, description, website, location ,logo};

    const company = await Company.findByIdAndUpdate(companyId, updateData, { new: true });

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    return res.status(200).json({ success: true, message: "Company updated successfully", company });

  } catch (error) {
    console.log("🔥 UpdateCompany Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
