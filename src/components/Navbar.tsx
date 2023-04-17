import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { FC, useState } from "react";
import { useRef } from "react";

const Navbar = ({}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return(<>
        <nav className="bg-black-100">
            <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">

                <div className="flex space-x-4">
                
                <div>
                    <a href="#" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
                    <span className="font-bold text-white px-2">ScreenStash</span>
                    </a>
                </div>
                </div>

            
                <div className="hidden md:flex items-center space-x-1">
                    <a href="" className="py-5 px-3 text-white-700 hover:text-gray-300">Search</a>
                <a href="" className="py-5 px-3">Now Showing</a>
                <a href="" className="py-2 px-3 bg-red-400 hover:bg-red-300 text-red-900 hover:text-red-800 rounded transition duration-300">Logout</a>
                </div>

            
                <div className="md:hidden flex items-center">
                <button className="mobile-menu-button" onClick={toggleMenu}>
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                </div>
            
            </div>
            </div>

        {/* Menu in mobile view */}
        <div className={`mobile-menu ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Search</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Now Showing</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Logout</a>
        </div>
      </nav>
    </>)
}

export default Navbar