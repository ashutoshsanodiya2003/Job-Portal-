import React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group' // correct Radix import

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"]
  }, {
    filterType: "Industry",
    array: ["Frontend Developer", "Full Stack Developer", "Backend Developer"]
  }, {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", '1lakh - 5lakh']
  }
]

const FilterCard = () => {
  return (
    <div>
      <h1>Filter Jobs</h1>
      <hr className='mt-3'/>

      <RadioGroup.Root className="space-y-4">
        {filterData.map((data, index) => (
          <div key={index} className="space-y-2">
            <h1>{data.filterType}</h1>

            {data.array.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <RadioGroup.Item 
                  value={item} 
                  className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </RadioGroup.Item>
                <label>{item}</label>
              </div>
            ))}

          </div>
        ))}
      </RadioGroup.Root>
    </div>
  )
}

export default FilterCard
