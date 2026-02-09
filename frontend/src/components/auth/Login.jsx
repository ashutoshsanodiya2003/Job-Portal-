import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import * as Label from '@radix-ui/react-label'
import { Button } from '../ui/button'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_URL_ENDPOINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



const Login = () => {
  const { loading } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: ''
  })

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  const submitHandler = async (e) => {
    e.preventDefault()

    try {

      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_URL_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        }, withCredentials: true
      })
      if (res.data.success) {
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }

  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center items-center mt-12 px-4">
        <form onSubmit={submitHandler} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Login Page </h2>



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
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}

                  type="radio" name="role" value="student" id="student" className="cursor-pointer" />
                <Label.Root htmlFor="student">Student</Label.Root>
              </div>
              <div className="flex items-center gap-2">
                <Input

                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  type="radio" name="role" value="recruiter" id="recruiter" className="cursor-pointer" />
                <Label.Root htmlFor="recruiter">Recruiter</Label.Root>
              </div>
            </div>
          </div>

          {
            loading ?
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
              :

              <Button className="w-full bg-[#f83002] text-white font-semibold py-2 rounded-md hover:bg-[#d92c00] transition-colors">
                Login
              </Button>

          }

          {/* Submit Button */}


          {/* Footer */}
          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#f83002] hover:underline">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login
