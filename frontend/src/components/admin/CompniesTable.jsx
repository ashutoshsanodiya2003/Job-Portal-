import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"

import { Avatar, AvatarImage } from "../ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent registered companies
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Avatar className="h-12 w-12">
                                <AvatarImage src="https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg" />
                            </Avatar>
                        </TableCell>

                        <TableCell>Company Name</TableCell>
                        <TableCell>16-02-2026</TableCell>

                        <TableCell>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <MoreHorizontal className="cursor-pointer" />
                                </PopoverTrigger>

                                <PopoverContent className="w-32">
                                    <div className="flex items-center gap-2 cursor-pointer">
                                        <Edit2 size={16} />
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                </TableBody>

            </Table>
        </div>
    )
}

export default CompaniesTable
