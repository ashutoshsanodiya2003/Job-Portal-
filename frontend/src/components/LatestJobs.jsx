import React from 'react'
import LatestJobCards from './LatestJobCards'
import { NavLink } from 'react-router-dom'

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]

const LatestJobs = () => {
    return (
        <div className="mt-10 px-4 max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                <span className="text-[#F83002]">Latest and Top Jobs Opening</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5">
                {randomJobs.slice(0,6).map((item, index) => (
                    <LatestJobCards />
                ))}
            </div>
        </div>
    )
}

export default LatestJobs
