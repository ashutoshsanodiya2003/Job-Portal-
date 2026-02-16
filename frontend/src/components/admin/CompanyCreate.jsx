import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_URL_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [companyName, setCompanyName] = useState('')

    const registerNewCompany = async () => {
        try {
const res = await axios.post(`${COMPANY_API_URL_ENDPOINT}/register`,{companyName},
    {withCredentials:true}
)
if(res?.data?.success){
    dispatch(setSingleCompany(res.data.company))
    toast.success(res.data.message)
    const companyId = res?.data?.company?._id
    navigate(`/admin/companies/${companyId}`)

}


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />

            <div className="max-w-xl mx-auto my-16 p-6 border rounded-lg shadow-sm">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Your Company Name</h1>
                    <p className="text-gray-500 mt-2">
                        What would you like to give your company name? You can change this later.
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label>Company Name</Label>
                        <Input
                            onChange={
                                (e) => setCompanyName(e.target.value)
                            }
                            type="text"
                            className="mt-2"
                            placeholder="JobHunt, Microsoft etc"
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => navigate("/admin/companies")
                        }>
                            Cancel
                        </Button>

                        <Button onClick={registerNewCompany}>
                            Continue
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CompanyCreate
