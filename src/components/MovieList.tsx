import Link from "next/link";
import {useState} from "react";
import Modal from "./Modal";
import {useMovieListContext} from "@/components/MovieListContext";

// Uses Modal to Search for movies
// When user adds movie from Modal, display added movies in MovieList
const MovieList = () => {
    const {movieList, movieListMovies} = useMovieListContext();
    const {deleteMovieFromMovieList} = useMovieListContext();
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

        {movieListMovies.length === 0 && <div className="justify-center text-center inter text-slate-200">Add Something To Get Started!</div>}

        <div
            className="grid place-items-start justify-items-center grid-flow-row mx-2 movie_list_h pb-2">
            <div className="grid gap-4 grid-cols-2 md:grid-cols-8 lg:gap-6 mt-1">
            {movieListMovies.map((movie) => {
                return (
                    <div key={movie._id}
                        className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl rounded bg-black bg-missing-image bg-no-repeat">
                        {movie.posterImageUrlPath && <img
                            className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125"
                            src={`https://image.tmdb.org/t/p/original${movie.posterImageUrlPath}`}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src="/project-2-six-pack/public/missing_image.svg";
                            }}
                            alt=""/>}
                        <div
                            className="absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 text-ellipsis bg-black/60">
                            {/* TODO: ADD PREVIEW DETAILS */}
                            <div
                                className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 overflow-hidden rounded">
                                {movie.title}
                                <div>{movie.releaseDate.substring(0, 4)}</div>
                            </div>
                            <div className='flex'>
                                <Link href={`movieDetails/${movie._id}`}
                                    className="rounded-full bg-neutral-900 py-1 px-1.5 text-sm capitalize text-white">
                                    See More
                                </Link>
                                <button
                                    className="rounded-full bg-red-500 py-1 px-1.5 text-sm capitalize text-white"
                                    onClick={async () => await deleteMovieFromMovieList(movie)}>
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>)
                })}
            </div>
        </div>
    </>)
}

export default MovieList;