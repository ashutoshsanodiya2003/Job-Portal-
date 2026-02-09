import { Search } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const HeroSection = () => {
  return (
    <div className="text-center mt-10 px-4">
      <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
        No. 1 Job Hunt Website
      </span>

      <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
        Search, Apply & <br />
        Get Your <span className="text-[#F83002]">Dream Jobs</span>
      </h1>

      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad consequatur dignissimos delectus deleniti.
      </p>

      <div className="mt-8 flex justify-center">
        <div className="flex w-full max-w-md items-center border border-gray-300 rounded-full overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#F83002]">
          <input
            type="text"
            placeholder="Find your dream jobs"
            aria-label="Search jobs"
            className="flex-1 px-5 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
          />

          <Button
            type="button"
            className="rounded-full bg-[black] hover:bg-[#d92c00]"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
