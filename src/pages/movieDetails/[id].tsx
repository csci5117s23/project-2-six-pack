import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getMediaInfo } from "@/modules/api_calls";
import { Movie } from "@/modules/types";
import {useMovieListContext} from "@/components/MovieListContext";

export default function movieDetails() {
    const router = useRouter();
    const { query } = router;
    const { getToken } = useAuth();
    const {addMovieToMovieList} = useMovieListContext();

    const [movie, setMovie] = useState<Movie | null>(null);

    const id = query.id;

    useEffect(() => {
        async function getMovie() {
            const movie = await getMediaInfo(getToken, id as string);

            if (movie === null) {
                // TODO: display error message or redirect to 404
                return;
            }

            setMovie(movie);
        }

        getMovie().then().catch(e => console.error(e));
    }, [getToken]);

    return (<>
        <Navbar />
        <div className="text-white bg-gradient-to-b from-black to-blue-900 p-5">
            <div className=" grid lg:grid-rows-3 lg:grid-flow-col gap-4 lg:p-10">
                <div className="row-span-3">
                    {movie?.posterImageUrlPath && <img className="rounded h-auto w-auto image_height" src={`https://image.tmdb.org/t/p/original${movie.posterImageUrlPath}`} alt="" />}
                </div>
                <div className="col-span-2">
                    <div className="inter md:text-2xl font-bold text-start col-span-2">{movie?.title}</div>
                    <div className="inter mb-4 text-left">{movie?.releaseDate}</div>
                </div>
                <div className="row-span-2 col-span-2 inter md:text-lg text-left">{movie?.description}</div>
            </div>
            <div className="justify-items-center mt-5">
                <div className="inter md:text-2xl font-bold text-center">Where To Watch</div>
                <div className="mt-3 flex justify-center">
                    <span className="px-2">Netflix</span>
                    <span className="px-2">HBO</span>
                    {movie?.services && Array.isArray(movie.services) && movie.services.map(service => {
                        console.log(service);
                        return (
                            <span className="px-2">{service}</span>
                        )
                    })}
                </div>
            </div>
            <div className="my-10 flex justify-center">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inter" onClick={async () => movie && addMovieToMovieList(movie)}>
                    Add to List
                </button>
            </div>
        </div>
    </>)
}