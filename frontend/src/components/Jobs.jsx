import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import FilterCard from './FilterCard'
import store from '@/redux/store'
import { useSelector } from 'react-redux'

// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8]

const Jobs = () => {

  const { allJobs, searchedQuery } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allJobs)

  // useEffect(() => {
  //   if (searchedQuery) {

  //     const filteredJobs = allJobs.filter((job)=>{
  //       return job.title.toLowerCase().includes(searchedQuery.toLowerCase())||
  //       job.description.toLowerCase().includes(searchedQuery.toLowerCase())||
  //       job.location.toLowerCase().includes(searchedQuery.toLowerCase())||
  //       job.salary.toLowerCase().includes(searchedQuery.toLowerCase())
  //     })

  //     setFilterJobs(filteredJobs)
  //   } else {
  //     setFilterJobs(allJobs)
  //   }
  // }, [])


  useEffect(() => {
  if (searchedQuery) {
    const filteredJobs = allJobs.filter((job) => {
      return (
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase()) 
      )
    })

    setFilterJobs(filteredJobs)
  } else {
    setFilterJobs(allJobs)
  }
}, [allJobs, searchedQuery])  // ✅ important


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
            filterJobs.length <= 0 ? (
              <span className="text-gray-500">Job not found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {
                   filterJobs.map((job) => (
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
