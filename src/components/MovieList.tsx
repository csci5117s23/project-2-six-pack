import {getMediaInfo, getMovieListById, getOrCreateInitialMovieList} from "@/modules/api_calls";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/nextjs";
import {Movie, MovieList} from "@/modules/types";
import { Dialog } from '@headlessui/react'

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Modal = ({ isOpen, onClose }: ModalProps) => {
    const [inputText, setInputText] = useState("")
    // console.log(inputText)
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50 bg-violet-600 overflow-y-auto">
        <div className="fixed inset-0 flex justify-center px-8 py-14">
            <Dialog.Panel className="w-full max-w-sm md:max-w-full rounded bg-gradient-to-b from-black to-transparent border-2 border-slate-800">
            <Dialog.Title className="flex justify-center inter">Add To Stash!</Dialog.Title>
            {/* SEARCH FOR MOVIE/SHOW */}
            <div className="flex justify-center inter">
                <input
                    className="text-white mb-5 w-1/2 rounded-[7px] bg-transparent px-3 py-2.5 border border-hidden rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 inter text-sm font-normal"
                    placeholder="Movie Title..."
                    id="addMovieSearch"
                    autoComplete="off"
                    onChange={(e) => setInputText(e.target.value)}
                />
                <div className="mb-5 flex justify-center">
                    <button className="ml-3 justify-center bg-violet-700 hover:bg-violet-800 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-500 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white inter" type="submit" onClick={() => console.log(inputText)}>Search</button>
                </div>
            </div>
            {/* WE CAN EITHER LIST ALL MOVIES/SHOWS FROM THE API AND FILTER WHEN USER SEARCHES OR ONLY SHOW RESULTS WHEN USER SEARCHES */}
            {/* EITHER WAY, THIS SHOULD BE THE GENERAL LAYOUT, REPLACE THE INNER DIV WITH MOVIE API COMPONENT */}
            <div className="grid place-items-start justify-items-center grid-flow-row overflow-y-auto mx-2 movie_list_h">
                <div className="grid gap-4 grid-cols-2 md:grid-cols-8 lg:gap-6 mt-1">
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-red-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-green-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-yellow-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-slate-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-red-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-green-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-yellow-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-purple-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto md:w-48 md:max-h-80 bg-slate-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-blue-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto md:w-48 md:max-h-80 bg-red-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-green-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-yellow-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-slate-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-red-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-green-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-yellow-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-purple-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto md:w-48 md:max-h-80 bg-slate-500">asda</div>
                    <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-blue-500">asda</div>
                </div>
            </div>

            <div className="flex justify-center mt-1">
                <button className="text-xs text-white inter hover:text-gray-400" onClick={onClose}>Close</button>
            </div>
            </Dialog.Panel>
        </div>
      </Dialog>
    )
  }

export type MovieListProps = {
    movieListId: string | null;
};

const MovieList = (props: MovieListProps) => {
    const {getToken} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movieList, setMovieList] = useState<MovieList | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect((): void => {
        async function getMovieList() {
            const movieList: MovieList | null = await (props.movieListId ? getMovieListById(getToken, props.movieListId) : getOrCreateInitialMovieList(getToken));
            if (movieList === null) {
                // TODO: display error message or redirect to 404
                return;
            }

            setMovieList(movieList);

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
    }, [getToken, props.movieListId]);

    return (<>
        <div className="my-5 w-screen flex justify-center">
            <button onClick={() => setIsModalOpen(true)} className="justify-center bg-violet-700 hover:bg-violet-800 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-500 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white inter">
                Add New
            </button>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {movies.length === 0 ?
                <div className="justify-center text-center inter">Add Something To Get Started!</div>
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