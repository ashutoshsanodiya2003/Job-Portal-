import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import * as Label from '@radix-ui/react-label'
import { Button } from '../ui/button'

import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { USER_API_URL_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'


const Register = () => {
 const navigate =  useNavigate()

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""

  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  const changeFileHandler = (e) => {
    setInput(({ ...input, file: e.target.file?.[0] }))
  }


  const submitHandler = async(e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("fullname",input.fullname)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)
    if(input.file){
    formData.append("file",input.file)

    }
    

    try {
      

      const res = await axios.post(`${USER_API_URL_ENDPOINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },withCredentials:true
      })
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center mt-12 px-4">
        <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Create Your Account</h2>

          {/* Full Name */}
          <div className="flex flex-col space-y-1">
            <Label.Root className="font-medium text-gray-700" htmlFor="fullName">
              Full Name
            </Label.Root>
            <Input

              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
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

              value={input.email}
              name="email"
              onChange={changeEventHandler}
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

              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}

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

              value={input.password}
              name="password"
              onChange={changeEventHandler}
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
                <Input
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}


                  type="radio" id="student" className="cursor-pointer" />
                <Label.Root htmlFor="student">Student</Label.Root>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  type="radio" id="recruiter" className="cursor-pointer" />
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
              onChange={changeFileHandler}
              className="cursor-pointer border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f83002]"
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-[#f83002] text-white font-semibold py-2 rounded-md hover:bg-[#d92c00] transition-colors">
            Register
          </Button>

          {/* Footer */}
          <p className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#f83002] hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Register
