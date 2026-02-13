// import React, { useState } from 'react'
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog"
// import { Label } from "./ui/label"
// import { Input } from "./ui/input"
// import { Button } from "./ui/button"
// import { Loader2 } from 'lucide-react'
// import { useDispatch, useSelector } from 'react-redux'
// import store from '@/redux/store'
// import axios from 'axios'
// import { USER_API_URL_ENDPOINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { setUser } from '@/redux/authSlice'

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false)
//   const { user } = useSelector(store => store.auth)
//   const dispatch = useDispatch()

//   const [input, setInput] = useState({
//     fullname: user?.fullname,
//     email: user?.email,
//     phoneNumber: user?.phoneNumber,
//     bio: user?.profile?.bio,
//     skills: user?.profile?.skills?.map(skill => skill),
//     file: user?.profile?.resume

//   })

//   const changeEventHandler = (e) => {
//   const { name, value } = e.target
//   setInput(prev => ({
//     ...prev,
//     [name]: value
//   }))
// }

// const changeFileHandler = (e) => {
//   const file = e.target.files[0]
//   setInput(prev => ({ ...prev, file }))
// }




//   const submitHandler =async (e)=>{
//     e.preventDefault()


//     const formData = new FormData()

//     formData.append("fullname",input.fullname)
//     formData.append("email",input.email)
//     formData.append("phoneNumber",input.phoneNumber)
//     formData.append("bio",input.bio)
//     formData.append("skills",input.skills)
//     if(input.file){
//     formData.append("file",input.file)

//     }


// try {

//   const res = await axios.patch(`${USER_API_URL_ENDPOINT}/update/profile`,formData,{
//     headers:{
//       "Content-Type":"multipart/form-data"
//     },withCredentials:true
//   })

//   if(res.data.success){
//     dispatch(setUser(res.data.user))
//     toast.success(res.data.message)
//   }

// } catch (error) {
//   console.log(error);
//   toast.error(error.response.data.message)

// }

// setOpen(false)

//     console.log(input)

//   }

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Update Profile</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={submitHandler} className="space-y-4 mt-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Name</Label>
//             <Input value={input.fullname}
//             onChange={changeEventHandler}
//               id="name" name="name" type="text"/>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="email">email</Label>
//             <Input value={input.email} onChange={changeEventHandler} id="email" name="email" type="email" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="number">Number</Label>
//             <Input value={input.phoneNumber} onChange={changeEventHandler} id="number" name="number" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="bio">Bio</Label>
//             <Input value={input.bio} onChange={changeEventHandler} id="bio" name="bio" />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="skills">Skills</Label>
//             <Input value={input.skills} onChange={changeEventHandler} id="skills" name="skills" />
//           </div>

//           <div className="space-y-2">
//   <Label htmlFor="file">Resume</Label>
//   <Input
//     id="file"
//     name="file"
//     type="file"
//     accept="application/pdf"
//     onChange={changeFileHandler} // value मत दो
//   />
// </div>





//           {
//             loading ?
//               <Button disabled>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Please wait
//               </Button>
//               :

//               <Button className="w-full bg-[#f83002] text-white font-semibold py-2 rounded-md hover:bg-[#d92c00] transition-colors">
//                 Update
//               </Button>

//           }
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default UpdateProfileDialog



import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_URL_ENDPOINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '', // comma separated string
    file: null // initially null
  })

  const changeEventHandler = (e) => {
    const { name, value } = e.target
    setInput(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const changeFileHandler = (e) => {
    const file = e.target.files[0]
    setInput(prev => ({ ...prev, file }))
  }

  // const submitHandler = async (e) => {
  //   e.preventDefault()
    

  //   try {
  //     const formData = new FormData()
  //     formData.append("fullname", input.fullname)
  //     formData.append("email", input.email)
  //     formData.append("phoneNumber", input.phoneNumber)
  //     formData.append("bio", input.bio)
  //     formData.append("skills", input.skills)
  //     if (input.file) formData.append("file", input.file)
  //     setLoading(true)

  //     const res = await axios.patch(
  //       `${USER_API_URL_ENDPOINT}/update/profile`,
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //         withCredentials: true
  //       }
  //     )

  //     if (res.data.success) {
  //       dispatch(setUser(res.data.user))
  //       console.log(res.data.user)
  //       toast.success(res.data.message)
  //       setOpen(false)
  //     }

  //   } catch (error) {
  //     console.log(error)
  //     toast.error(error?.response?.data?.message || "Something went wrong")
  //   }finally{
  //     setLoading(false)
  //   }

    
  // }

  const submitHandler = async (e) => {
  e.preventDefault()
  setLoading(true) // ✅ move here

  try {
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("bio", input.bio)
    formData.append("skills", input.skills)

    if (input.file) {
      formData.append("file", input.file)
    }

    const res = await axios.patch(
      `${USER_API_URL_ENDPOINT}/update/profile`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      }
    )

    if (res.data.success) {
      dispatch(setUser(res.data.user))
      toast.success(res.data.message)
      setOpen(false)
    }

  } catch (error) {
    toast.error(error?.response?.data?.message || "Something went wrong")
  } finally {
    setLoading(false)
  }
}


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitHandler} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="fullname"
              type="text"
              value={input.fullname}
              onChange={changeEventHandler}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Phone Number</Label>
            <Input
              id="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              name="bio"
              value={input.bio}
              onChange={changeEventHandler}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              name="skills"
              value={input.skills}
              onChange={changeEventHandler}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Resume (PDF)</Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="application/pdf"
              onChange={changeFileHandler} // value नहीं देना
            />
          </div>

           {
                      loading ?
                        <Button disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </Button>
                        :
          
                        <Button className="w-full bg-[#f83002] text-white font-semibold py-2 rounded-md hover:bg-[#d92c00] transition-colors">
                          update
                        </Button>
          
                    }
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog

