import Layout from "@/components/Layout";
import Link from "next/link";
import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar />
            {/* <Layout> */}
            <div className="grid grid-cols-3 h-screen bg-cover bg-gray-500 flex flex-col items-center justify-center bg-movies-background bg-repeat animate-ltr-linear-infinite">
                <div></div>
                <div className="h-screen bg-gradient-to-l from-black to-transparent"></div>
                <div className="p-10 h-screen bg-black">
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
                        <Link href="/dashboard" className="rounded-full font-bold bg-deep-purple p-3">Dashboard</Link>
                    </div>
                </div>
            </div>

            {/* </Layout> */}
        </>
    )
}
