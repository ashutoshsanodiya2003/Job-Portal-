import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo / Name */}
        <div className="mb-4 md:mb-0 text-lg font-bold">
          MyCompany
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

        {/* Copyright */}
        <div className="mt-4 md:mt-0 text-xs text-gray-400">
          © 2026 MyCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
