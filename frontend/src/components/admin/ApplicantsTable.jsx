import React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table"

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../ui/popover"

import { MoreHorizontal, SpaceIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

const shortlistingStatus = ["Accepted", "Rejected"]


const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application)


    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>

                {/* Table Header */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (

                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className="text-blue-600 cursor-pointer">

                                    {

                                        item.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item?.applicant?.profile?.resumeOriginalName}</a> : <span>NA</span>

                                    }

                                </TableCell>
                                <TableCell>
                                    {item?.applicant?.createdAt?.split("T")[0]}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer">
                                            <MoreHorizontal size={18} />
                                        </PopoverTrigger>

                                        <PopoverContent className="w-28">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    key={index}
                                                    className="p-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
                                                >
                                                    {status}
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                    {/* Row 1 */}


                    {/* Row 2 */}
                    {/* <TableRow>
            <TableCell>Priya Verma</TableCell>
            <TableCell>priya@gmail.com</TableCell>
            <TableCell>9123456780</TableCell>
            <TableCell className="text-blue-600 cursor-pointer">
              View
            </TableCell>
            <TableCell>19 Mar 2026</TableCell>

            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger className="cursor-pointer">
                  <MoreHorizontal size={18} />
                </PopoverTrigger>

                <PopoverContent className="w-28">
                  {shortlistingStatus.map((status, index) => (
                    <div
                      key={index}
                      className="p-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
                    >
                      {status}
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow> */}

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable