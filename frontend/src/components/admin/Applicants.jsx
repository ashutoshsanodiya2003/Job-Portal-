import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_URL_ENDPOINT } from '@/utils/constant'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
    const params  = useParams()
    const dispatch = useDispatch()

    const {applicants} = useSelector(store => store.application)

    useEffect(()=>{
        const fetchAllApplicants = async()=>{

            try {
                const res = await axios.get(`${APPLICATION_API_URL_ENDPOINT}/${params.id}/applicants`,{withCredentials:true})
                dispatch(setAllApplicants(res.data.job))
    
    
                
            } catch (error) {
    
                console.log(error)
                
            }

        }
fetchAllApplicants()

    },[])


  return (
    <div className="min-h-screen bg-gray-100">
  <Navbar />

  {/* Navbar ke niche spacing */}
  <div className="pt-20 px-4">
    
    <div className="max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Applicants {applicants?.applications?.length}
        </h1>
        {/* <p className="text-sm text-gray-500 mt-1">
          Manage all job applicants easily
        </p> */}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <ApplicantsTable />
      </div>

    </div>

  </div>
</div>
  )
}

export default Applicants