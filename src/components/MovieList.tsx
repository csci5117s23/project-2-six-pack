import {getMediaInfo, getMovieListById, getOrCreateInitialMovieList, searchMoviesByTitle} from "@/modules/api_calls";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/nextjs";
import {Movie, MovieList} from "@/modules/types";
import { Dialog } from '@headlessui/react'
import Modal from "./Modal";

export type MovieListProps = {
    movieListId: string | null;
};

// Uses Modal to Search for movies
// When user adds movie from Modal, display added movies in MovieList
const MovieList = (props: MovieListProps) => {
    const {getToken} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieList, setMovieList] = useState<MovieList | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieListID, setMovieListID] = useState<string | null>("");
    //PROBLEM: GET/CREATE MOVIE LIST ID
    useEffect((): void => {
        async function getMovieList() {
            const movieList: MovieList | null = await (props.movieListId ? getMovieListById(getToken, props.movieListId) : getOrCreateInitialMovieList(getToken));
            if (movieList === null) {
                // TODO: display error message or redirect to 404
                return;
            }

            setMovieList(movieList);
            setMovieListID(props.movieListId)
            for (let mediaId in movieList.movieIds) {
                const media: Movie | null = await getMediaInfo(getToken, mediaId);
                if (media === null) {
                    // TODO: display error
                    continue;
                }

                setMovies(movies.concat(media));
            }
        }

        getMovieList().then().catch(e => console.error(e));
        console.log(movieListID)
    }, [getToken, props.movieListId]);

    return (<>
        <div className="my-5 w-screen flex justify-center">
            <button onClick={() => setIsModalOpen(true)} className="justify-center bg-violet-700 hover:bg-violet-800 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-500 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white inter">
                Add New
            </button>
        </div>
        {/* PROBLEM: PASS movieListID TO MODAL */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} movieListID={movieListID}/>

        {movies.length === 0 ?
                <div className="justify-center text-center inter text-slate-200">Add Something To Get Started!</div>
                : null}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5 justify-center px-2">
            {movieList?.name}
            <ul>
                {movies.map((movie) => {
                    return (
                        <li className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">
                            <img
                                className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125"
                                src={`https://image.tmdb.org/t/p/original${movie.posterImageUrlPath}`} alt=""/>
                            <div
                                className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                {/* TODO: ADD PREVIEW DETAILS */}
                                <div
                                    className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    PLACE DETAILS HERE, EITHER DESCRIPTION OR WHERE TO WATCH
                                </div>
                                <Link href={{
                                    pathname: "/movieDetails/",
                                    query: {
                                        id: movie._id,
                                        title: movie.title
                                    }
                                }}
                                      as={`movieDetails/${movie.title}`}
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