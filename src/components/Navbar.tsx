import {useState} from "react";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import Modal from "./Modal";
import Link from "next/link";

const Navbar = ({}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (<>
        <nav className="bg-black text-white">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">

                    <div className="flex space-x-4">

                        <div>
                            <Link href="/dashboard" className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                                    <line x1="7" y1="2" x2="7" y2="22"></line>
                                    <line x1="17" y1="2" x2="17" y2="22"></line>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <line x1="2" y1="7" x2="7" y2="7"></line>
                                    <line x1="2" y1="17" x2="7" y2="17"></line>
                                    <line x1="17" y1="17" x2="22" y2="17"></line>
                                    <line x1="17" y1="7" x2="22" y2="7"></line>
                                </svg>
                                <span className="font-bold text-white px-2">ScreenStash</span>
                            </Link>
                        </div>
                    </div>


                    <div className="hidden md:flex items-center space-x-1">
                        <button onClick={() => setIsModalOpen(true)} className="py-5 px-3 text-white-700 hover:text-gray-300">Search</button>
                        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                        <Link href="/gmaps" className="py-5 px-3 text-white-700 hover:text-gray-300">Nearby Theaters</Link>
                        <SignedOut>
                            <SignInButton redirectUrl='/dashboard'/>
                        </SignedOut>
                        <SignedIn>
                            <UserButton signInUrl='/sign-in' showName={false} afterSignOutUrl='/'
                                        afterMultiSessionSingleSignOutUrl='/' afterSwitchSessionUrl='/dashboard'
                                        userProfileUrl='/profile'/>
                        </SignedIn>
                    </div>


                    <div className="md:hidden flex items-center">
                        <button className="mobile-menu-button" onClick={toggleMenu}>
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* Menu in mobile view */}
            <div className={`mobile-menu ${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <button onClick={() => setIsModalOpen(true)} className="block py-2 px-4 text-sm hover:bg-gray-200">Search</button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">Now Showing</a>
                <div className="py-2 px-4">
                    <SignedOut>
                        <SignInButton redirectUrl='/dashboard'/>
                    </SignedOut>
                    <SignedIn>
                        <UserButton signInUrl='/sign-in' showName={false} afterSignOutUrl='/'
                                    afterMultiSessionSingleSignOutUrl='/' afterSwitchSessionUrl='/dashboard'
                                    userProfileUrl='/profile'/>
                    </SignedIn>
                </div>
            </div>
        </nav>
    </>)
}

export default Navbar