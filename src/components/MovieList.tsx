import { getMovieListById } from "@/modules/api_calls";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import {GetToken} from "@clerk/types";

const MovieList = () => {
    
    const [movies, setMovies] = useState([])
    
    return(<>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5 justify-center px-2">
        
        <ul>
            {movies.map((movie, index) => {
                return(<li className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">
                        {/* TODO: CHANGE IMAGE SRC */}
                        <img className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125" src="" alt="" />
                        <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                            {/* TODO: ADD PREVIEW DETAILS */}
                            <div className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                PLACE DETAILS HERE, EITHER DESCRIPTION OR WHERE TO WATCH
                            </div>
                            {/* TODO: REPLACE ID AND TITLE WITH RESPECTIVE VALUES ALSO CHANGE TO as={`movieDetails/${movie.title}`} */}
                            <Link href={{
                                pathname: "/movieDetails/",
                                query: {
                                    id: 123,
                                    title: "Movie Title"
                                }
                            }}
                            as={`movieDetails/${"MovieTitle"}`} 
                            className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60">
                                See More
                            </Link>
                        </div>

                </li>)
            })}
        </ul>
        
        
        <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">
            <img className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.themoviedb.org%2Ft%2Fp%2Fw440_and_h660_face%2Fuh4xY5eWCy20DjhCpfesjhdilhK.jpg&f=1&nofb=1&ipt=2d2489b36ad22ac5de54ca27e0b9d2e5d4bd45096e2610a71b26de4147b8960a&ipo=images" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                {/* <h1 className="text-3xl font-bold text-white">Hunger Games</h1> */}
                <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolore adipisci placeat.</p>
                <Link href={{
                                pathname: "/movieDetails/",
                                query: {
                                    id: 123,
                                    title: "Movie Title"
                                }
                            }}
                            as={`movieDetails/${"Title"}`} 
                            className="rounded-full bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white shadow shadow-black/60">
                                See More
                            </Link>
            </div>
        </div>



    </div>
    </>)
}

export default MovieList;