import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_URL_ENDPOINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  // const user = false; 
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_URL_ENDPOINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        toast.success(res.data.message)
      }

    } catch (error) {
      console.log(error)

      toast.error(error.data.message)

    }

  }

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Job <span className="text-[#f83002]">Portal</span>
        </h1>

        {/* Menu + Avatar / Auth Buttons */}
        <div className="flex items-center gap-6">
          <ul className="flex gap-6 text-gray-700 font-medium">


            {
              user && user.role === 'recruiter' ? (
                <>
                  <li className="cursor-pointer hover:text-[#f83002]"> <Link to={'/admin/compnies'}>Compnies</Link></li>
                  <li className="cursor-pointer hover:text-[#f83002]"><Link to={'/admin/jobs'}>Jobs</Link></li>
                </>
              ) : (
                <>

                  <li className="cursor-pointer hover:text-[#f83002]"> <Link to={'/'}>Home</Link></li>
                  <li className="cursor-pointer hover:text-[#f83002]"><Link to={'/jobs'}>Jobs</Link></li>
                  <li className="cursor-pointer hover:text-[#f83002]"><Link to={'/Browse'}>Browse</Link></li>
                </>
              )
            }

          </ul>

          {!user ? (
            <div className="flex gap-2">

              <Link to={"/login"}>
                <Button variant="outline">Login</Button>

              </Link>
              <Link to={'/register'}>
                <Button>Sign Up</Button>

              </Link>

            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-56 space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {
                    user&& user.role === 'student' &&
                    <Button variant="link" className="justify-start">
                    <User2 className="mr-2" />    <Link to={'/profile'}> View Profile</Link>
                  </Button>
                  }
                  <Button onClick={logoutHandler} variant="link" className="justify-start text-red-500">
                    <LogOut className="mr-2" /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
