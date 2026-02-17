import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { COMPANY_API_URL_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import store from "@/redux/store";
import { useSelector } from "react-redux";

const CompanySetup = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const {singleCompany} = useSelector(store=>store.company)
  // Text inputs
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // File input
  const changefileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", input.name)
    formData.append("description", input.description)
    formData.append("website", input.website)
    formData.append("location", input.location)
    if (input.file) {

      formData.append("file", input.file)
    }


    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_URL_ENDPOINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }, withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message)
        navigate('/admin/companies')

      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    } finally {
      setLoading(false)
    }

  }


  useEffect(()=>{
    setInput({
      name: singleCompany.name||"",
    description: singleCompany.description||"",
    website: singleCompany.website|| "",
    location: singleCompany.location|| "",
    file: singleCompany.file||null,
    })
  },[singleCompany])
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto my-12 p-8 bg-white shadow-md rounded-lg">
        {/* Header */}
        <div className="flex items-center mb-8 gap-4">
          <Button  onClick={()=>navigate('/admin/companies')}variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Company Setup</h1>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Company Name */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-medium text-gray-700">Company Name</h2>
            <Input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              placeholder="Enter company name"
              className="w-full"
            />
          </div>

          {/* Website */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-medium text-gray-700">Website</h2>
            <Input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              placeholder="https://example.com"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-medium text-gray-700">Description</h2>
            <textarea
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Brief description of your company"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#f83002]"
              rows={4}
            />
          </div>

          {/* Location */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-medium text-gray-700">Location</h2>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              placeholder="City, State, Country"
              className="w-full"
            />
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-medium text-gray-700">Upload Logo</h2>
            <input
              type="file"
              onChange={changefileHandler}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">

            {
              loading ?
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
                :

                <Button className="w-full bg-[#f83002] text-white font-semibold py-2 rounded-md hover:bg-[#d92c00] transition-colors">
                  Update
                </Button>

            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
