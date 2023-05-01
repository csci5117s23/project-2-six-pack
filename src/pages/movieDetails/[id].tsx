import Navbar from "@/components/Navbar";
import {useRouter} from "next/router";
import {useAuth} from "@clerk/nextjs";
import {useEffect, useState} from "react";
import {getMediaInfo, getMediaStreamingService} from "@/modules/api_calls";
import {Movie} from "@/modules/types";
import {useMovieListContext} from "@/components/MovieListContext";
import {MotnStreamingType} from "../../../sixpack2/motn_impl";
import externalLinkIcon from '../../../public/icons8-external-link-64.png';
import Image from "next/image";

export default function movieDetails() {
    const router = useRouter();
    const {query} = router;
    const {getToken} = useAuth();
    const {
        addMovieToMovieList,
        deleteMovieFromMovieList,
        updateMovie,
        isMovieInMovieList
    } = useMovieListContext();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [movieServices, setMovieServices] = useState<[string, MotnStreamingType[]][] | null>(null);

    const id = query.id;

    useEffect(() => {
        async function getMovie() {
            const movie = await getMediaInfo(getToken, id as string);

            if (movie === null) {
                // TODO: display error message or redirect to 404
                return;
            }

            setMovie(movie);
            doSetMovieServices(movie);
        }

        getMovie().then().catch(e => console.error(e));
    }, [getToken]);

    async function getStreamingServicesForMovie() {
        if (movie === null) {
            return;
        }

        let updatedMovie = JSON.parse(JSON.stringify(movie));

        updatedMovie.services = await getMediaStreamingService(getToken, updatedMovie._id);

        updateMovie(updatedMovie);
        setMovie(updatedMovie);
        doSetMovieServices(updatedMovie);
    }

    function doSetMovieServices(movie: Movie) {
        if (movie.services === null) {
            setMovieServices(null);
            return;
        }

        const movieServices: [string, MotnStreamingType[]][] = [];
        for (const service in movie.services) {
            const streamingInformation = movie.services[service];

            movieServices.push([service, streamingInformation]);
        }
        setMovieServices(movieServices);
    }

    return (<>
        <Navbar/>
        <div className="text-white bg-gradient-to-b from-black to-blue-900 p-5 h-full overflow-y-scroll">
            <div className="grid lg:grid-rows-3 lg:grid-flow-col gap-4 lg:p-10">
                <div className="row-span-3">
                    {movie?.posterImageUrlPath && <img className="rounded h-auto w-auto image_height"
                                                       src={`https://image.tmdb.org/t/p/original${movie.posterImageUrlPath}`}
                                                       alt=""/>}
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
                    {movieServices !== null ?
                        (movieServices.length > 0 ? movieServices.map(([serviceName, streamingInformation]) => {
                            return (
                                <div className="px-2">
                                    <b>{serviceName}</b>
                                    <div>
                                        {streamingInformation.map(streamingInfo => (
                                            <div className='flex gap-1'>
                                                <span>{`${streamingInfo.type}${streamingInfo.quality && ` (${streamingInfo.quality})`}:`}</span>
                                                {(streamingInfo.link || streamingInfo.watchLink) && <div>
                                                    <a href={streamingInfo.link ?? streamingInfo.watchLink}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className='flex gap-1 items-center justify-center'>
                                                        {streamingInfo.link ? 'View' : 'Watch'}{' Here'}
                                                        <Image src={externalLinkIcon} alt={''} className='w-4 h-4'/>
                                                    </a>
                                                </div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        }) : <span>Not available on any streaming service</span>)
                        : <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inter"
                            onClick={async () => await getStreamingServicesForMovie()}>
                            Fetch Streaming Information
                        </button>}
                </div>
            </div>
            <div className="my-10 flex justify-center">
                <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inter"
                    onClick={async () => movie && (isMovieInMovieList(movie) ? deleteMovieFromMovieList(movie) : addMovieToMovieList(movie))}>
                    {movie && (isMovieInMovieList(movie) ? 'Remove from ' : 'Add to ')} List
                </button>
            </div>
        </div>
    </>)
}