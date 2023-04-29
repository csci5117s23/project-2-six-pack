import { Dialog } from '@headlessui/react'
import {getMovieListById, searchMoviesByTitle, updateMovieList} from "@/modules/api_calls";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/nextjs";
import {Movie, MovieList} from "@/modules/types";
import {GetToken} from "@clerk/types";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  movieListID: string | null;
};


const Modal = ({ isOpen, onClose, movieListID }: ModalProps) => {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const {getToken} = useAuth();
  const [movieTitle, setMovieTitle] = useState("")
  const [movieList, setMovieList] = useState<MovieList | null>(null);
  // SEARCH FOR MOVIE BY TITLE
  useEffect(() => {
      async function getMovieList() {
          const fetchedMovies: Movie[] | null = await searchMoviesByTitle(getToken, movieTitle);
          if (fetchedMovies === null) {
              // TODO: display error message or redirect to 404
              return;
          }

          setMovies(fetchedMovies);
      }

      if (movieTitle) {
          getMovieList().then().catch(e => console.error(e));
          console.log(movieTitle)
      }
  }, [getToken, movieTitle]);
  
  //PROBLEM: GET USER'S MOVIE LIST
  useEffect(() => {
    async function getListMovies() {
        console.log("getting movie list by id")
        if (movieListID) {
            console.log("Got Movie List")
            const listMovies: MovieList | null = await getMovieListById(getToken, movieListID);
            if (listMovies === null) {
                // TODO: display error message or redirect to 404
                return;
            }
    
            setMovieList(listMovies);
      }
    }
  
    getListMovies().then().catch(e => console.error(e));
  }, [getToken, movieListID]);
  
  //PROBLEM: ADD MOVIE TO USER'S MOVIE LIST WHEN USER CLICKS ADD BUTTON
  async function addMovie(movieID: string) {
    console.log("clicked add movie")
    if (!movieList) {
        console.log("movie list does not exist")
        return;
    }
    movieList.movieIds.push(movieID);
    const updatedMovieList: MovieList | null = await updateMovieList(getToken, movieList);
    if (updatedMovieList === null) {
      // TODO: display error message or redirect to 404
      return;
    }

    setMovieList(updatedMovieList);
    console.log(movieList.movieIds.length)
  }

  // Render Overlay screen with results from user search
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50 bg-violet-600 overflow-y-auto">
      <div className="fixed inset-0 flex justify-center px-8 py-14">
          <Dialog.Panel className="w-full max-w-sm md:max-w-full rounded bg-gradient-to-b from-black to-transparent border-2 border-slate-800">
          <Dialog.Title className="flex justify-center inter">Add To Stash!</Dialog.Title>
          {/* SEARCH FOR MOVIE/SHOW */}
          {/* On Submit, update movieTitle which will trigger useEffect */}
          <div className="inter">
              <form className="w-full"
                  onSubmit={(e) => {
                  e.preventDefault();
                  setMovieTitle(inputText);
              }}>
                  <div className="flex justify-center">
                      <input
                          className="w-1/2 rounded-[7px] bg-transparent px-3 py-2.5 border border-hidden rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700 inter text-sm font-normal text-slate-200"
                          placeholder="Movie Title..."
                          id="addMovieSearch"
                          autoComplete="off"
                          onChange={(e) => setInputText(e.target.value)}
                      />
                      <input className="ml-3 bg-violet-700 hover:bg-violet-800 active:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-500 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white inter" type="submit" value="Search" />
                  </div>
              </form>
          </div>
          {/* WE CAN EITHER LIST ALL MOVIES/SHOWS FROM THE API AND FILTER WHEN USER SEARCHES OR ONLY SHOW RESULTS WHEN USER SEARCHES */}
          {/* EITHER WAY, THIS SHOULD BE THE GENERAL LAYOUT, REPLACE THE INNER DIV WITH MOVIE API COMPONENT */}
          <div className="grid place-items-start justify-items-center grid-flow-row overflow-y-auto mx-2 movie_list_h">
              <div className="grid gap-4 grid-cols-2 md:grid-cols-8 lg:gap-6 mt-1">
                      {/* Ensure that movielist is array and then iterate if so */}
                      {(!Array.isArray(movies) || !movies.length) ? (
                            <div className='flex inter text-white text-lg justify-center text-center mt-2'>Nothing Found...</div>
                            ) : (
                            Array.isArray(movies) &&
                                movies.map((movie) => {
                                return (
                                <div key={movie._id} className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl rounded bg-black">
                                    <img
                                        className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125"
                                        src={`https://image.tmdb.org/t/p/original${movie.posterImageUrlPath}`} alt=""/>
                                    <div
                                        className="absolute inset-0 flex translate-y-[100%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 text-ellipsis bg-black/60">
                                        {/* TODO: ADD PREVIEW DETAILS */}
                                        <div
                                            className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 overflow-hidden rounded">
                                            {movie.title}
                                            <div>{movie.releaseDate.substring(0,4)}</div>
                                        </div>
                                        <div className='flex'>
                                            <Link href={{
                                                pathname: "/movieDetails/",
                                                query: {
                                                    id: movie._id,
                                                    title: movie.title
                                                }
                                            }}
                                                as={`movieDetails/${movie.title}`}
                                                className="rounded-full bg-neutral-900 py-1 px-1.5 text-sm capitalize text-white">
                                                See More
                                            </Link>
                                            {/* PROBLEM: ADD MOVIE */}
                                            <button className="rounded-full bg-vibrant-purple py-1 px-1.5 text-sm capitalize text-white" onClick={() => addMovie(movie._id)}>Add</button>
                                        </div>
                                    </div>

                                </div>)
                        })
                      )}
              </div>
              <button className="text-xs text-white inter hover:text-gray-400 mt-1" onClick={onClose}>Close</button>
          </div>

         
          </Dialog.Panel>
      </div>
    </Dialog>
  )
}
export default Modal