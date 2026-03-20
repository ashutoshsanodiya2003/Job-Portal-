import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
// import { Select } from 'radix-ui'
// import { SelectTrigger, SelectValue } from '../ui/select'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel
} from "../ui/select"
import axios from 'axios'
import { JOB_API_URL_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];


const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: ''
  })

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const { companies } = useSelector(store => store.company)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }


  const selectChangeHandler = (value)=>{
    const seletedCompany = companies.find((company)=>company.name.toLowerCase()==value)

    setInput({...input,companyId:seletedCompany._id})
  }

  const submitHandler = async(e) => {
    e.preventDefault()

    try {

      setLoading(true)

      const res = await axios.post(`${JOB_API_URL_ENDPOINT}/post`,input,
        {
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        }
      )

      if(res.data.success){
        toast.success(res.data.message)
        navigate('/admin/jobs')
      }
      
    } catch (error) {
     

      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
   
    
  }

  return (
    <div>
      <Navbar />

      {/* Navbar ke niche div */}
      <div className="w-full max-w-sm bg-white p-4 rounded shadow-md mt-6 mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Post a New Job</h2>
        <form className="grid grid-cols-1 gap-2" onSubmit={submitHandler}>

          <div>
            <Label className="text-sm">Title</Label>
            <Input
              value={input.title}
              onChange={changeEventHandler}
              type="text"
              name="title"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          <div>
            <Label className="text-sm">Description</Label>
            <Input
              value={input.description}
              onChange={changeEventHandler}
              type="text"
              name="description"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          <div>
            <Label className="text-sm">Requirements</Label>
            <Input
              value={input.requirements}
              onChange={changeEventHandler}
              type="text"
              name="requirements"
              placeholder="comma separated"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          <div>
            <Label className="text-sm">Salary</Label>
            <Input
              value={input.salary}
              onChange={changeEventHandler}
              type="number"
              name="salary"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          <div>
            <Label className="text-sm">Location</Label>
            <Input
              value={input.location}
              onChange={changeEventHandler}
              type="text"
              name="location"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          <div>
            <Label className="text-sm">Job Type</Label>
            <Input
              value={input.jobType}
              onChange={changeEventHandler}
              type="text"
              name="jobType"
              placeholder="Full-time / Part-time / Internship"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          <div>
            <Label className="text-sm">Experience</Label>
            <Input
              value={input.experience}
              onChange={changeEventHandler}
              type="number"
              name="experience"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          <div>
            <Label className="text-sm">Positions</Label>
            <Input
              value={input.position}
              onChange={changeEventHandler}
              type="number"
              name="position"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          <div>
            <Label className="text-sm">Company ID</Label>
            <Input
              value={input.companyId}
              onChange={changeEventHandler}
              type="text"
              name="companyId"
              className="w-full text-sm py-1 px-2"
            />
          </div>

          {
            companies.length > 0 && (
              

              
    <Select onValueChange={selectChangeHandler} >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a Company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>

          {
            companies.map((company)=>{
              return (
                <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
              )
            })
          }
          
          
        </SelectGroup>
      </SelectContent>
    </Select>
  

            )
          }



           {
                        loading ?
                          <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                          </Button>
                          :
          
                          <Button className="w-full bg-[#f83002] text-white font-semibold py-2 rounded-md hover:bg-[#d92c00] transition-colors">
                           Post New Job
                          </Button>
          
                      }

          {

            companies.length == 0 && <p className='text-xs text-red-600 font-bold text-center my-3'> *please register a company first ,before post a Job</p>
          }
        </form>
      </div>
    </div>
  )
}

export default PostJob