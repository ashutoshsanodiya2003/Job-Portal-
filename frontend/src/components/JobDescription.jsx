// import React, { useEffect, useState } from 'react'
// import { Button } from './ui/button'
// import { Badge } from './ui/badge'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { setSingleJob } from '@/redux/jobSlice'
// import { APPLICATION_API_URL_ENDPOINT, JOB_API_URL_ENDPOINT } from '@/utils/constant'
// import { useDispatch, useSelector } from 'react-redux'
// import store from '@/redux/store'
// import { toast } from 'sonner'

// const JobDescription = () => {
//   const dispatch = useDispatch()
//   const { singleJob } = useSelector(store => store.job)
//   const { user } = useSelector(store => store.auth)
//   // const isApplied = false
//   const isintiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false   
// const [isApplied, setIsApplied] = useState(isintiallyApplied)

//   const params = useParams()
//   const jobId = params.id

//   const applyJobHandler = async()=>{
//     try {
//       const res = await axios.get(`${APPLICATION_API_URL_ENDPOINT}/apply/${jobId}`,{withCredentials:true})
//       console.log(res.data)
//       if(res.data.success){
//         setIsApplied(true)
//         toast.success(res.data.message)
//       }
//     } catch (error) {
//       console.log(error)
//       toast.error(error.response.data.message)
      
//     }

//   }


//   useEffect(() => {
//     const fetchSinglejob = async () => {
//       try {
//         const res = await axios.get(`${JOB_API_URL_ENDPOINT}/get/${jobId}`, { withCredentials: true })
//         if (res.data.success) {
//           dispatch(setSingleJob(res.data.job))
//           setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     fetchSinglejob()
//   }, [jobId, dispatch, user?._id,])

//   return (
//     <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">

//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border p-8 space-y-8">

//         {/* Header */}
//         <div>
//           <h1 className="text-2xl font-semibold">{singleJob?.title}</h1>

//           <div className="flex flex-wrap gap-2 mt-4">
//             <Badge variant="secondary">{singleJob?.position} Positions</Badge>
//             <Badge variant="secondary">{singleJob?.jobType} jobType</Badge>
//             <Badge variant="secondary">{singleJob?.salary} LPA</Badge>
//           </div>
//         </div>

//         {/* Apply Button */}
//         <div className="pt-4 border-t flex justify-end">
//           <Button

// onClick={isApplied?null:applyJobHandler}

//             disabled={isApplied}
//             size="lg"
//             variant={isApplied ? "secondary" : "default"}
//             className={isApplied ? "cursor-not-allowed" : ""}
//           >
//             {isApplied ? 'Already Applied' : 'Apply Now'}
//           </Button>
//         </div>

//         {/* Job Description Section */}
//         <div className="border-t pt-6 space-y-4">
//           <h2 className="text-lg font-semibold">Job Description</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

//             <div>
//               <p className="text-muted-foreground">Role</p>
//               <p className="font-medium">{singleJob?.title}</p>
//             </div>

//             <div>
//               <p className="text-muted-foreground">Location</p>
//               <p className="font-medium">{singleJob?.location}</p>
//             </div>

//             <div>
//               <p className="text-muted-foreground">Experience</p>
//               <p className="font-medium">{singleJob?.experienceLevel} Years</p>
//             </div>

//             <div>
//               <p className="text-muted-foreground">Salary</p>
//               <p className="font-medium">{singleJob?.salary} LPA</p>
//             </div>

//             <div>
//               <p className="text-muted-foreground">Total Applicants</p>
//               <p className="font-medium">{singleJob?.applications?.length}</p>
//             </div>

//             <div>
//               <p className="text-muted-foreground">Posted Date</p>
//               <p className="font-medium">{singleJob?.createdAt.split("T")[0]}</p>
//             </div>

//           </div>

//           <div>
//             <p className="text-muted-foreground text-sm mt-4">Description</p>
//             <p className="text-sm leading-relaxed mt-1">
//               {
//                 singleJob?.description
//               }
//             </p>
//           </div>

//         </div>

//       </div>
//     </div>
//   )
// }

// export default JobDescription


import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { setSingleJob } from '@/redux/jobSlice'
import { APPLICATION_API_URL_ENDPOINT, JOB_API_URL_ENDPOINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const dispatch = useDispatch()
  const { singleJob } = useSelector((store) => store.job)
  const { user } = useSelector((store) => store.auth)

  const [isApplied, setIsApplied] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id: jobId } = useParams()

  // ✅ Apply Job
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_URL_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      )

      if (res.data.success) {
        setIsApplied(true)
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  // ✅ Fetch Job
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        setLoading(true)

        const res = await axios.get(
          `${JOB_API_URL_ENDPOINT}/get/${jobId}`,
          { withCredentials: true }
        )

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))

          const applied = res.data.job.applications?.some(
            (application) => application.applicant === user?._id
          )

          setIsApplied(applied)
        }
      } catch (error) {
        toast.error("Failed to fetch job details")
      } finally {
        setLoading(false)
      }
    }

    if (jobId) {
      fetchSingleJob()
    }
  }, [jobId, dispatch, user?._id])

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading job details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border p-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold">{singleJob?.title}</h1>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">
              {singleJob?.position} Positions
            </Badge>
            <Badge variant="secondary">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="secondary">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-4 border-t flex justify-end">
          <Button
            onClick={applyJobHandler}
            disabled={isApplied}
            size="lg"
            variant={isApplied ? "secondary" : "default"}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        {/* Job Description Section */}
        <div className="border-t pt-6 space-y-4">
          <h2 className="text-lg font-semibold">Job Description</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <div>
              <p className="text-muted-foreground">Role</p>
              <p className="font-medium">{singleJob?.title}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{singleJob?.location}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Experience</p>
              <p className="font-medium">
                {singleJob?.experienceLevel} Years
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Salary</p>
              <p className="font-medium">
                {singleJob?.salary} LPA
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Total Applicants</p>
              <p className="font-medium">
                {singleJob?.applications?.length || 0}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground">Posted Date</p>
              <p className="font-medium">
                {singleJob?.createdAt
                  ? new Date(singleJob.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

          </div>

          <div>
            <p className="text-muted-foreground text-sm mt-4">
              Description
            </p>
            <p className="text-sm leading-relaxed mt-1">
              {singleJob?.description}
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default JobDescription

