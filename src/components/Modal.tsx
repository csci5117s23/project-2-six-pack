import { Dialog } from '@headlessui/react'
import {searchMoviesByTitle} from "@/modules/api_calls";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useAuth} from "@clerk/nextjs";
import {Movie, MovieList} from "@/modules/types";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [inputText, setInputText] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const {getToken} = useAuth();
  const [movieTitle, setMovieTitle] = useState("")
  // Search for movie by title
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
                      {Array.isArray(movies) && movies.map((movie) => {
                          return (
                              <div key={movie._id} className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 rounded">
                                  <img
                                      className="rounded h-auto max-w-full transition-transform duration-500 group-hover:scale-125"
                                      src={`https://image.tmdb.org/t/p/original${movie.posterImageUrlPath}`} alt=""/>
                                  <div
                                      className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                                      {/* TODO: ADD PREVIEW DETAILS */}
                                      <div
                                          className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-ellipsis overflow-hidden">
                                          {movie.description}
                                      </div>
                                      <Link href={{
                                          pathname: "/movieDetails/",
                                          query: {
                                              id: movie._id,
                                              title: movie.title
                                          }
                                      }}
                                          as={`movieDetails/${movie.title}`}
                                          className="rounded-full bg-neutral-900 py-1 px-1.5 text-sm capitalize text-white shadow shadow-black/60">
                                          See More
                                      </Link>
                                  </div>

                              </div>)
                      })}
                  
                  {/* <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-red-500">asda</div>
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
                  <div className="rounded h-64 md:h-80 h-auto w-32 md:w-48 md:max-h-80 bg-blue-500">asda</div> */}
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
export default Modal