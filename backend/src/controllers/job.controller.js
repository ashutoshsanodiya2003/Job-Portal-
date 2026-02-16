import { Job } from "../models/job.model.js";

export const jobPost = async (req, res) => {

    
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements:requirements.split(","),
      salary:Number(salary),
      location,
      jobType,
      experienceLevel:experience,
      position,
      company:companyId,
      create_by:userId
    });


    return res.status(201).json({
        message:"job created successfully",
        success:true,
        job
    })
  } catch (error) {
    console.log(error);
  }
};





// export const getAllJobs = async(req,res)=>{

// console.log("hello");

//     try {
        
//         const keyword = req.query.keyword || "";

// const query = {
//     $or: [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } }

//     ]
// };

// const jobs = await Job.find(query)
// if(jobs){
//     return res.status(404).json({
//         message :"jobs not found",
//         success:false,
        
//     })
// }

// return res.status(200).json({
//     message:"all job fetched successfully",
//     success:true,
//     jobs
// })
//     } catch (error) {
//         console.log(error)
//     }
// }


export const getAllJobs = async (req, res) => {
  console.log("hello");

  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const jobs = await Job.find(query).populate({
        path:"company"
    }).sort({createdAt:-1});

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "All jobs fetched successfully",
      success: true,
      jobs
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};


export const getJobById = async(req,res)=>{


    try {
        

        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
          path:"applications"
        })


        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }


        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getAdminJob =async (req,res)=>{

    try {
        const adminId = req.id

        const job = await Job.find({create_by:adminId})

        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }

        return res.status(200).json({
            job,
            success:true
        })

    } catch (error) {
        console.log(error)
    }

}




