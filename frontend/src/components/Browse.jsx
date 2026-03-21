import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useSelector } from 'react-redux'

const randomJobs = [1, 2, 3]

const Browse = () => {
  const {allJobs} = useSelector(store=>store.job)
  return (
    <div className="p-4">
      <Navbar />
      
      <h1 className="text-xl font-semibold my-4">
        Search Result ({allJobs.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allJobs.map((job) => (
          <Job job={job} key={job._id} />
        ))}
      </div>
    </div>
  )
}

export default Browse
