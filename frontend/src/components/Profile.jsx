import React from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Pen, Mail, Phone } from 'lucide-react'; // Badge will be a custom UI component
import { Button } from './ui/button';
import { Badge } from './ui/badge'; // Make sure you import Badge correctly
import { Label } from 'radix-ui';

const skills = ['html', 'JavaScript', 'java', 'react'];

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
        {/* Edit Button in Top-Right */}
        <Button variant="outline" className="absolute top-4 right-4 p-2">
          <Pen className="w-4 h-4" />
        </Button>

        {/* Avatar and Profile Info */}
        <div className="flex items-center space-x-6 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://png.pngtree.com/png-vector/20190304/ourmid/pngtree-growth-business-company-logo-png-image_728232.jpg" />
            <AvatarFallback>JB</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-xl font-bold">Full Name</h1>
            <p className="text-gray-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, unde.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5" />
            <span>patel@gmail.com</span>
          </div>

          <div className="flex items-center space-x-3 text-gray-700">
            <Phone className="w-5 h-5" />
            <span>1234567890</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.length !== 0 ? (
              skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Profile;
