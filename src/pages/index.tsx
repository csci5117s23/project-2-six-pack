import Link from "next/link";
import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar />
            {/* For large screens */}
            <div className="flex-grow hidden items-center justify-center lg:grid lg:grid-cols-3 bg-cover bg-gray-500 bg-movies-background bg-repeat animate-ltr-linear-infinite">
                <div></div>
                <div className="h-full bg-gradient-to-l from-black to-transparent"></div>
                <div className="h-full p-10 bg-black">
                    <div className="font-bold text-4xl text-white mb-5">
                        <a className="flex items-center">
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
                        </a>
                    </div>
                    <div className="mb-10">
                        Screen Stash is a user-friendly website that allows you to create a personalized list of movies and TV shows that you want to watch. Not only that, it also helps you find out where you can watch them on various streaming services, all in one place.
                    </div>
                    <div>
                        <Link href="/dashboard" className="bg-violet-700 hover:bg-violet-800 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-500 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white inter">Dashboard</Link>
                    </div>
                </div>
            </div>

            {/* For small screens */}
            <div className="flex-grow lg:hidden h-screen grid-container grid grid-cols-10 bg-cover bg-gray-500 flex flex-col items-center justify-center bg-movies-background bg-repeat animate-ltr-linear-infinite">
                <div className="h-full bg-gradient-to-l from-black to-transparent col-span-2"></div>
                <div className="text-center pt-10 h-full bg-black col-span-6">
                    <div className="font-bold text-4xl text-white mb-5">
                        <div className="items-center">
                            <span className="font-bold text-white px-2">ScreenStash</span>
                        </div>
                    </div>
                    <div className="mb-10">
                        Screen Stash is a user-friendly website that allows you to create a personalized list of movies and TV shows that you want to watch. Not only that, it also helps you find out where you can watch them on various streaming services, all in one place.
                    </div>
                    <div>
                        <Link href="/dashboard" className="bg-violet-700 hover:bg-violet-800 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-500 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white inter">Dashboard</Link>
                    </div>
                </div>
                <div className="h-full bg-gradient-to-r from-black to-transparent col-span-2"></div>
            </div>
        </>
    )
}
