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

        {/* the content below wont be used anymore */}
        <div className="text-white bg-gradient-to-b from-black to-blue-900 p-5 grid grid-rows-6 grid-cols-3 gap-4 justify-items-center">
            <div className="row-span-2 justify-center">
                {movie?.posterImageUrlPath && <img className="rounded h-auto w-auto image_height" src={`https://image.tmdb.org/t/p/original${movie.posterImageUrlPath}`} alt="" />}
            </div>
            <div className="row-span-2 col-span-2 text-left ">
                <div className="inter md:text-2xl font-bold text-start">{movie?.title}</div>
                {/* TODO: CHANGE TO MOVIE DETAILS */}
                <div className="inter mb-4 text-left">{movie?.releaseDate}</div>
                <div className="inter md:text-lg text-left">{movie?.description}</div>
            </div>

            <div className="row-span-1 col-span-3 justify-center mt-5">
                <div className="inter md:text-2xl font-bold text-center">Where To Watch</div>
                <div className="justify-center flex">

                    {movie?.services && Array.isArray(movie.services) && movie.services.map(service => {
                        console.log(service);
                        return (
                            <span>{service}</span>
                        )
                    })}
                    {/* <a href="https://play.hbomax.com/page/urn:hbo:page:GYKjr7A3svLHDwwEAAAB9:type:feature"><img className="h-20 md:h-min justify-center" src="https://img.icons8.com/ios-glyphs/256/hbo-max.png"></img></a>
                    <img className="h-20 md:h-min justify-center" src="https://img.icons8.com/fluency/256/amazon-prime-video.png"></img> */}
                </div>
            </div>
            <div className="row-span-1 col-span-3 justify-center space-x-4 mt-5">
                {/* TODO: ADD COMPONENT TO LIST TAGS i.e <Tags /> */}
                <button className="bg-transparent hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-full outline outline-2 outline-slate-700">Horror</button>
                <button className="bg-transparent hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-full outline outline-2 outline-slate-700">Drama</button>
                <button className="bg-transparent hover:bg-slate-700 text-slate-200 font-bold py-2 px-4 rounded-full outline outline-2 outline-slate-700">Mystery</button>
            </div>
            <div className="row-span-1 col-span-3 justify-center">
                <div className="flex">
                    {/* TODO: ADD COMPONENT TO LIST MOVIE RATING */}
                    <img className="h-10 w-10" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartqueen.com%2Fimage-files%2Fyellow-star-3.png&f=1&nofb=1&ipt=2edcf1502dc0af26f9466d7bf4d384b4d761dc780ce9e8a63c414a4e0b18f68b&ipo=images"></img>
                    <span className="px-2 mt-2 inter text-2xl">7.3</span>
                    <img className="h-12 w-12" src="https://img.icons8.com/external-tal-revivo-color-tal-revivo/256/external-imdb-an-online-database-of-information-related-to-films-and-television-programs-logo-color-tal-revivo.png"></img>
                </div>
            </div>
            <div className="row-span-1 col-span-3 justify-center">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inter" onClick={async () => movie && addMovieToMovieList(movie)}>
                    Add to List
                </button>
            </div>
        </div>
    </>)
}