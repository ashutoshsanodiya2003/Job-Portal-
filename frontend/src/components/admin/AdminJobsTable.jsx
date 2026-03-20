
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
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

                      <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 curser-pointer mt-2'>
                        <Eye className='w-4' />
                        <span>Applicants</span>


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


