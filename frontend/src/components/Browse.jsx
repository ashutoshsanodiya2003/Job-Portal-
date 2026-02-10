import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'

const randomJobs = [1, 2, 3]

const Browse = () => {
  return (
    <div className="p-4">
      <Navbar />
      
      <h1 className="text-xl font-semibold my-4">
        Search Result ({randomJobs.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {randomJobs.map((item, index) => (
          <Job key={index} />
        ))}
      </div>
    </div>
  )
}

export default Browse
