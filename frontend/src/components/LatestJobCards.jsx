import React from 'react';

const LatestJobCards = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 max-w-sm shadow-sm hover:shadow-md transition-shadow duration-200 font-sans">
      
      {/* Company Info */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold">Company Name</h1>
        <p className="text-gray-500 text-sm">India</p>
      </div>

      {/* Job Info */}
      <div className="mb-4">
        <h1 className="text-md font-medium mb-1">Job Title</h1>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, quas.
        </p>
      </div>

      {/* Badges */}
      <div className="flex space-x-2">
        <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">12 Position</span>
        <span className="px-3 py-1 bg-blue-200 rounded-full text-sm">Part Time</span>
        <span className="px-3 py-1 bg-green-200 rounded-full text-sm">24 LPA</span>
      </div>

    </div>
  )
}

export default LatestJobCards;
