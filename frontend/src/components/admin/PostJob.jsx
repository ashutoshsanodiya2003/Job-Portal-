import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

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

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('Job Posted:', input)
    // API call yaha kar sakte ho
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

    <Button type="submit" className="w-full mt-2 py-2 text-sm">Post Job</Button>
  </form>
</div>
    </div>
  )
}

export default PostJob