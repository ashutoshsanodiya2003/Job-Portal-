import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import FilterCard from './FilterCard'

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8]

const Jobs = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto mt-5 px-4">
        <div className="flex gap-5">

          {/* Filter Section */}
          <div className="w-1/4">
            <FilterCard />
          </div>

          {/* Jobs Section */}
          {
            jobArray.length <= 0 ? (
              <span className="text-gray-500">Job not found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {
                    jobArray.map((item, index) => (
                      <div key={index}>
                        <Job />
                      </div>
                    ))
                  }
                </div>

              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Jobs
