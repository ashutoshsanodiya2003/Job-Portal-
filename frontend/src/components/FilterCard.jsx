import React, { useEffect, useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Full Stack Developer", "Backend Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh - 5lakh"]
  }
]

const FilterCard = () => {

  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div>
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className='mt-3' />

      <RadioGroup.Root
        value={selectedValue}
        onValueChange={changeHandler}
        className="space-y-4 mt-4"
      >
        {filterData.map((data, index) => (
          <div key={index} className="space-y-2">
            <h2 className="font-semibold">{data.filterType}</h2>

            {data.array.map((item, idx) => {
              const itemId = `r${index}-${idx}`

              return (
                <div key={idx} className="flex items-center gap-2">
                  <RadioGroup.Item
                    id={itemId}
                    value={item}
                    className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center"
                  >
                    {/* Indicator only shows when selected */}
                    <RadioGroup.Indicator className="w-2 h-2 bg-blue-500 rounded-full" />
                  </RadioGroup.Item>

                  <label htmlFor={itemId} className="cursor-pointer">
                    {item}
                  </label>
                </div>
              )
            })}
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  )
}

export default FilterCard