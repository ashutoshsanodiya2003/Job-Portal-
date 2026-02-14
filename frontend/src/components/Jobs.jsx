import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import FilterCard from './FilterCard'
import store from '@/redux/store'
import { useSelector } from 'react-redux'

const jobArray = [1, 2, 3, 4, 5, 6, 7, 8]

const Jobs = () => {

    const { allJobs } = useSelector(store => store.job)

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
            allJobs.length <= 0 ? (
              <span className="text-gray-500">Job not found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {
                    allJobs.map((job) => (
                      <div key={job?._id}>
                        <Job job={job} />
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
