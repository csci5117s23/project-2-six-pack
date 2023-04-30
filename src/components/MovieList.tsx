import Link from "next/link";
import {useState} from "react";
import Modal from "./Modal";
import {useMovieListContext} from "@/components/MovieListContext";

// Uses Modal to Search for movies
// When user adds movie from Modal, display added movies in MovieList
const MovieList = () => {
    const {movieList, movieListMovies} = useMovieListContext();

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (<>
        <div className="my-5 w-screen flex justify-center">
            <button onClick={() => setIsModalOpen(true)}
                    className="justify-center bg-violet-700 hover:bg-violet-800 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-500 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white inter">
                Add New
            </button>
        </div>
        {/* PROBLEM: PASS movieListID TO MODAL */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>

        {movieListMovies.length === 0 &&
            <div className="justify-center text-center inter text-slate-200">Add Something To Get Started!</div>}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5 justify-center px-2">
            {movieList?.name}
            <ul>
                {movieListMovies.map((movie) => {
                    return (
                        <li className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">
                            {movie.posterImageUrlPath && <img
                                className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125"
                                src={`https://image.tmdb.org/t/p/original${movie.posterImageUrlPath}`} alt=""/>}
                            <div
                                className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                {/* TODO: ADD PREVIEW DETAILS */}
                                <div
                                    className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    PLACE DETAILS HERE, EITHER DESCRIPTION OR WHERE TO WATCH
                                </div>
                                <Link href={`movieDetails/${movie._id}`}
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