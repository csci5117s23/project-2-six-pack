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
    </div>
    </>)
}

export default MovieList;