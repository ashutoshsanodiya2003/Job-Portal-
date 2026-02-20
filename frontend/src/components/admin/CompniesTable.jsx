// // import React from 'react'
// // import {
// //     Table,
// //     TableBody,
// //     TableCaption,
// //     TableCell,
// //     TableHead,
// //     TableHeader,
// //     TableRow,
// // } from "../ui/table"

// // import { Avatar, AvatarImage } from "../ui/avatar"
// // import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// // import { Edit2, MoreHorizontal } from 'lucide-react'
// // import { useSelector } from 'react-redux'

// // // const CompaniesTable = () => {
// // //     const {companies} = useSelector(store=>store.company)
// // //     return (
// // //         <div>
// // //             <Table>
// // //                 <TableCaption>
// // //                     A list of your recent registered companies
// // //                 </TableCaption>

// // //                 <TableHeader>
// // //                     <TableRow>
// // //                         <TableHead>Logo</TableHead>
// // //                         <TableHead>Name</TableHead>
// // //                         <TableHead>Date</TableHead>
// // //                         <TableHead>Action</TableHead>
// // //                     </TableRow>
// // //                 </TableHeader>

// // //                 <TableBody>

// // //                     {
// // //                        companies.length <=0? <span>you haven't registered any company yet</span> :(
// // // <>
// // // {
// // //     companies?.map((companies)=>{
// // //         return(
// // //             <div key={company._id}>
// // //             <TableRow>
// // //                         <TableCell>
// // //                             <Avatar className="h-12 w-12">
// // //                                 <AvatarImage src="https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg" />
// // //                             </Avatar>
// // //                         </TableCell>

// // //                         <TableCell>{company.name}</TableCell>
// // //                         <TableCell>{company.createdAt.split("T")[0]}</TableCell>

// // //                         <TableCell>
// // //                             <Popover>
// // //                                 <PopoverTrigger asChild>
// // //                                     <MoreHorizontal className="cursor-pointer" />
// // //                                 </PopoverTrigger>

// // //                                 <PopoverContent className="w-32">
// // //                                     <div className="flex items-center gap-2 cursor-pointer">
// // //                                         <Edit2 size={16} />
// // //                                         <span>Edit</span>
// // //                                     </div>
// // //                                 </PopoverContent>
// // //                             </Popover>
// // //                         </TableCell>
// // //                     </TableRow>
// // //             </div>
// // //         )
// // //     })
// // // }
// // // </>
// // //                        )
// // //                     }
                    
// // //                 </TableBody>

// // //             </Table>
// // //         </div>
// // //     )
// // // }






// // export default CompaniesTable


// import React, { useEffect, useState } from 'react'
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
// import { Edit2, MoreHorizontal } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// const CompaniesTable = () => {
//     const { companies, searchCompanyByText } = useSelector(store => store.company);
//     const [filterCompany, setFilterCompany] = useState(companies);
//     const navigate = useNavigate();
//     useEffect(()=>{
//         const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
//             if(!searchCompanyByText){
//                 return true
//             };
//             return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

//         });
//         setFilterCompany(filteredCompany);
//     },[companies,searchCompanyByText])
//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your recent registered companies</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Logo</TableHead>
//                         <TableHead>Name</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {
//                         filterCompany?.map((company) => (
//                             <tr>
//                                 <TableCell>
//                                     <Avatar>
//                                         <AvatarImage src={company.logo}/>
//                                     </Avatar>
//                                 </TableCell>
//                                 <TableCell>{company.name}</TableCell>
//                                 <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//                                 <TableCell className="text-right cursor-pointer">
//                                     <Popover>
//                                         <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
//                                         <PopoverContent className="w-32">
//                                             <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
//                                                 <Edit2 className='w-4' />
//                                                 <span>Edit</span>
//                                             </div>
//                                         </PopoverContent>
//                                     </Popover>
//                                 </TableCell>
//                             </tr>

//                         ))
//                     }
//                 </TableBody>
//             </Table>
//         </div>
//     )
// }

// export default CompaniesTable



import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState([])
  const navigate = useNavigate()

  // Filter companies based on search text
  useEffect(() => {
    if (!companies) {
      setFilterCompany([])
      return
    }

    const filtered = companies.filter(company => {
      if (!searchCompanyByText) return true
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })

    setFilterCompany(filtered)
  }, [companies, searchCompanyByText])

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                {companies.length === 0 ? 'No companies registered yet' : 'No companies match your search'}
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map(company => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name || 'N/A'}</TableCell>
                <TableCell>{company?.createdAt ? company.createdAt.split("T")[0] : 'N/A'}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
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

export default CompaniesTable