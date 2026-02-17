import { setCompanies } from '@/redux/companySlice'
import { COMPANY_API_URL_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {

        const fetchCompanies = async () => {


            try {

                const res = await axios.get(`${COMPANY_API_URL_ENDPOINT}/get`,{
                    withCredentials:true
                })


                if(res.data.success){
                    dispatch(setCompanies(res.data.success))
                }
            } catch (error) {
                console.log(error)

            }
        }

    }, [])
}

export default useGetAllCompanies