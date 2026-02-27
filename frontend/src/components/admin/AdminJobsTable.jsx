
// // // import React, { useEffect, useState } from 'react'
// // // import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// // // import { Avatar, AvatarImage } from '../ui/avatar'
// // // import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// // // import { Edit2, MoreHorizontal } from 'lucide-react'
// // // import { useSelector } from 'react-redux'
// // // import { useNavigate } from 'react-router-dom'
// // // import { setSearchJobByText } from '@/redux/jobSlice'

// // // const AdminJobsTable = () => {
// // //   const { companies, searchCompanyByText } = useSelector(store => store.company)
// // //   const {allAdminJobs} = useSelector(store=>store.job)
// // //   const [filterjob, setFilterJob] = useState(allAdminJobs)
// // //   const navigate = useNavigate()

// // //   // Filter companies based on search text
// // //   useEffect(() => {
// // //     if (!companies) {
// // //       setFilterCompany([])
// // //       return
// // //     }

// // //     const filtered = allAdminJobs.filter(company => {
// // //       if (!searchCompanyByText) return true
// // //       return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
// // //     })

// // //     setSearchJobByText(filtered)
// // //   }, [allAdminJobs, searchCompanyByText])




// // //    useEffect(()=>{
// // //         const filteredCompany = allAdminJobs.length >= 0 && companies.filter((job)=>{
// // //             if(!searchCompanyByText){
// // //                 return true
// // //             };
// // //             return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

// // //         });
// // //         setSearchJobByText(filteredCompany);
// // //     },[allAdminJobs,searchCompanyByText])
// // //   return (
// // //     <div>
// // //       <Table>
// // //         <TableCaption>A list of your recent posted jobs</TableCaption>
// // //         <TableHeader>
// // //           <TableRow>
// // //             <TableHead>Company Name</TableHead>
// // //             <TableHead>Role</TableHead>
// // //             <TableHead>Date</TableHead>
// // //             <TableHead className="text-right">Action</TableHead>
// // //           </TableRow>
// // //         </TableHeader>
// // //         <TableBody>
// // //           {filterjob.length === 0 ? (
// // //             <TableRow>
// // //               <TableCell colSpan={4} className="text-center">
// // //                 {companies.length === 0 ? 'No companies registered yet' : 'No companies match your search'}
// // //               </TableCell>
// // //             </TableRow>
// // //           ) : (
// // //             filterjob.map(job => (
// // //               <TableRow key={job._id}>
                
// // //                 <TableCell>{job?.name || 'N/A'}</TableCell>
// // //                 <TableCell>{job?.createdAt ? job.createdAt.split("T")[0] : 'N/A'}</TableCell>
// // //                 <TableCell className="text-right cursor-pointer">
// // //                   <Popover>
// // //                     <PopoverTrigger>
// // //                       <MoreHorizontal />
// // //                     </PopoverTrigger>
// // //                     <PopoverContent className="w-32">
// // //                       <div
// // //                         onClick={() => navigate(`/admin/companies/${job._id}`)}
// // //                         className="flex items-center gap-2 w-fit cursor-pointer"
// // //                       >
// // //                         <Edit2 className="w-4" />
// // //                         <span>Edit</span>
// // //                       </div>
// // //                     </PopoverContent>
// // //                   </Popover>
// // //                 </TableCell>
// // //               </TableRow>
// // //             ))
// // //           )}
// // //         </TableBody>
// // //       </Table>
// // //     </div>
// // //   )
// // // }

// // // export default AdminJobsTable


// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { setSearchJobByText } from '@/redux/jobSlice'

// const AdminJobsTable = () => {
//   const dispatch = useDispatch()
//   const { companies } = useSelector(store => store.company)
//   const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
//   const [filterjob, setFilterJob] = useState(allAdminJobs || [])
//   const navigate = useNavigate()

//   // useEffect(() => {
//   //   if (!allAdminJobs) {
//   //     setFilterJob([])
//   //     return
//   //   }

//   //   const filtered = allAdminJobs.filter(job => {
//   //     if (!searchJobByText) return true
//   //     return job?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
//   //   })

//   //   setFilterJob(filtered)
//   //   dispatch(setSearchJobByText(filtered))  // Redux store में भी भेज दिया
//   // }, [allAdminJobs, searchJobByText, dispatch])

//    useEffect(() => {
//     if (!allAdminJobs) {
//       setFilterJob([])
//       return
//     }

//     // filter jobs based on search text (only component state)
//     const filtered = allAdminJobs.filter(job => {
//       if (!searchJobByText) return true
//       return job?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
//     })

//     setFilterJob(filtered)
//   }, [allAdminJobs, searchJobByText])

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent posted jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filterjob.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center">
//                 {companies.length === 0 ? 'No companies registered yet' : 'No companies match your search'}
//               </TableCell>
//             </TableRow>
//           ) : (
//             filterjob.map(job => (
//               <TableRow key={job.company._id}>
//                 <TableCell>{job?.company?.name || 'N/A'}</TableCell>
//                 <TableCell>{job?.company?.role || 'N/A'}</TableCell>
//                 <TableCell>{job?.company?.createdAt ? job?.company?.createdAt.split("T")[0] : 'N/A'}</TableCell>
//                 <TableCell className="text-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div
//                         onClick={() => navigate(`/admin/companies/${job._id}`)}
//                         className="flex items-center gap-2 w-fit cursor-pointer"
//                       >
//                         <Edit2 className="w-4" />
//                         <span>Edit</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// export default AdminJobsTable



// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const AdminJobsTable = () => {
//   const { companies } = useSelector(store => store.company)
//   const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
//   const [filterjob, setFilterJob] = useState(allAdminJobs || [])
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!allAdminJobs) return setFilterJob([])

//     const filtered = allAdminJobs.filter(job => {
//       if (!searchJobByText) return true
//       return job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())

//       const companyRole = (job?.company?.role || '').toLowerCase()
//       return companyRole.includes(searchText)
//     })

//     setFilterJob(filtered)
//   }, [allAdminJobs, searchJobByText])

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent posted jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filterjob.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center">
//                 {companies.length === 0 ? 'No companies registered yet' : 'No jobs match your search'}
//               </TableCell>
//             </TableRow>
//           ) : (
//             filterjob.map(job => (
//               <TableRow key={job._id}>
//                 <TableCell>{job?.company?.name || 'N/A'}</TableCell>
//                 <TableCell>{job?.title || 'N/A'}</TableCell>
//                 <TableCell>{job?.createdAt ? job.createdAt.split("T")[0] : 'N/A'}</TableCell>
//                 <TableCell className="text-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div
//                         onClick={() => navigate(`/admin/companies/${job?.company?._id}`)}
//                         className="flex items-center gap-2 w-fit cursor-pointer"
//                       >
//                         <Edit2 className="w-4" />
//                         <span>Edit</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

// export default AdminJobsTable




import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const navigate = useNavigate()
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs || [])

  useEffect(() => {
    if (!allAdminJobs) return setFilteredJobs([])

    // filter by company name or company role
    const filtered = allAdminJobs.filter(job => {
      if (!searchJobByText) return true
      const searchText = searchJobByText.toLowerCase()
      const companyName = job?.company?.name?.toLowerCase() || ''
      const companyRole = job?.title?.toLowerCase() || ''
      return companyName.includes(searchText) || companyRole.includes(searchText)
    })

    setFilteredJobs(filtered)
  }, [allAdminJobs, searchJobByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs match your search
              </TableCell>
            </TableRow>
          ) : (
            filteredJobs.map(job => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name || 'N/A'}</TableCell>
                <TableCell>{job?.title || 'N/A'}</TableCell>
                <TableCell>{job?.createdAt ? job.createdAt.split("T")[0] : 'N/A'}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${job?.company?._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AdminJobsTable


