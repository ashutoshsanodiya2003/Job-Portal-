import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import * as Label from '@radix-ui/react-label'
import { Button } from '../ui/button'

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center mt-12 px-4">
        <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Create Your Account</h2>

          {/* Full Name */}
          <div className="flex flex-col space-y-1">
            <Label.Root className="font-medium text-gray-700" htmlFor="fullName">
              Full Name
            </Label.Root>
            <Input
              id="fullName"
              type="text"
              placeholder="Patel"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f83002] placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <Label.Root className="font-medium text-gray-700" htmlFor="email">
              Email
            </Label.Root>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f83002] placeholder:text-gray-400"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col space-y-1">
            <Label.Root className="font-medium text-gray-700" htmlFor="phone">
              Phone Number
            </Label.Root>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 ***********"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f83002] placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col space-y-1">
            <Label.Root className="font-medium text-gray-700" htmlFor="password">
              Password
            </Label.Root>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f83002] placeholder:text-gray-400"
            />
          </div>

          {/* User Type */}
          <div className="flex flex-col space-y-2">
            <Label.Root className="font-medium text-gray-700">I am a:</Label.Root>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Input type="radio" name="role" value="student" id="student" className="cursor-pointer" />
                <Label.Root htmlFor="student">Student</Label.Root>
              </div>
              <div className="flex items-center gap-2">
                <Input type="radio" name="role" value="recruiter" id="recruiter" className="cursor-pointer" />
                <Label.Root htmlFor="recruiter">Recruiter</Label.Root>
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col space-y-2">
            <Label.Root className="font-medium text-gray-700">Profile Picture</Label.Root>
            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f83002]"
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-[#f83002] text-white font-semibold py-2 rounded-md hover:bg-[#d92c00] transition-colors">
            Register
          </Button>

          {/* Footer */}
          <p className="text-sm text-gray-500 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-[#f83002] hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
