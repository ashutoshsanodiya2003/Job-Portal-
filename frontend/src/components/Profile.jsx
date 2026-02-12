import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Pen, Mail, Phone } from 'lucide-react'; // Badge will be a custom UI component
import { Button } from './ui/button';
import { Badge } from './ui/badge'; // Make sure you import Badge correctly
// import Application from './AppliedJobTable';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
// import  Label  from 'radix-ui';

// const skills = ['html', 'JavaScript', 'java', 'react'];
const isResume = true

const Profile = () => { 

    const [open, setOpen] = useState(false)
    const {user} = useSelector(store=>store.auth)
    console.log("user.phoneNumber",user.phoneNumber)
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
                {/* Edit Button in Top-Right */}
                <Button onClick={() => setOpen(true)} variant="outline" className="absolute top-4 right-4 p-2">
                    <Pen className="w-4 h-4" />
                </Button>

                {/* Avatar and Profile Info */}
                <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg" />
                        <AvatarFallback>JB</AvatarFallback>
                    </Avatar>

                    <div>
                        <h1 className="text-xl font-bold">{user?.fullname}</h1>
                        <p className="text-gray-600">
                            {user?.bio}
                        </p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3 text-gray-700">
                        <Mail className="w-5 h-5" />
                        <span>{user?.email}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                        <Phone className="w-5 h-5" />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user?.profile?.skills.length !== 0 ? (
                            user?.profile?.skills.map((skill, index) => (
                                <Badge key={index}>{skill}</Badge>
                            ))
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5 mt-5 border-b-2 border-b-blue-950'>
                    <h3 className="font-medium mb-2">Resume</h3>
                    {isResume ? (
                        <a
                            target='_blank'
                            rel="noopener noreferrer"
                            href="https://github.com/ashutoshsanodiya2003/Job-Portal-"
                            className="text-blue-600 underline hover:text-blue-800"
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span>NA</span>
                    )}
                </div>

                <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6'>

                    <h1 className='text-2xl font-bold text-gray-900 mb-4'>Applied Jobs</h1>
                    <AppliedJobTable />

                </div>

                <UpdateProfileDialog open={open} setOpen={setOpen} />

            </div>

        </div>
    );
};

export default Profile;
