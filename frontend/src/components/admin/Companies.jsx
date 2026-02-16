import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompniesTable from './CompniesTable'
import { useNavigate } from 'react-router-dom'

const Companies = () => {
    const navigate = useNavigate()
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between mb-5">
          <Input 
            placeholder="Search companies..."
            className="w-72"
          />
          <Button onClick={() => navigate('/admin/companies/create')}>
  New Company
</Button>

        </div>

        <CompniesTable />
      </div>
    </div>
  )
}

export default Companies
