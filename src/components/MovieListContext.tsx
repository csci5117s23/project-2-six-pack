import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Movie, MovieList} from "@/modules/types";
import {getMediaInfo, getMovieListById, getOrCreateInitialMovieList, updateMovieList} from "@/modules/api_calls";
import {useAuth} from "@clerk/nextjs";

export type MovieListContextValue = {
    movieList: MovieList | null;
    movieListMovies: Movie[];
    addMovieToMovieList: (movie: Movie) => Promise<void>;
    deleteMovieFromMovieList: (movie: Movie) => Promise<void>;
};

const MovieListContext = createContext<MovieListContextValue>({
    movieList: null,
    movieListMovies: [],
    addMovieToMovieList: () => Promise.resolve(),
    deleteMovieFromMovieList: () => Promise.resolve(),
});

export type MovieListContextProps = {
    movieListId?: string;
}

export default function MovieListContextProvider(props: PropsWithChildren<MovieListContextProps>) {
    const { getToken } = useAuth();

    const [movieList, setMovieList] = useState<MovieList | null>(null);
    const [movieListMovies, setMovieListMovies] = useState<Movie[]>([]);

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

                setMovieListMovies(movieListMovies.concat(media));
            }
        }

        getMovieList().then().catch(e => console.error(e));
    }, [getToken, props.movieListId]);

    async function addMovieToMovieList(movie: Movie) {
        console.log("clicked add movie")

        if (!movieList) {
            console.log("movie list does not exist")
            return;
        }
        movieList.movieIds.push(movie._id);

        const updatedMovieList: MovieList | null = await updateMovieList(getToken, movieList);
        console.log('updated movie list', updatedMovieList);
        if (updatedMovieList === null) {
            // TODO: display error message or redirect to 404
            return;
        }

        setMovieList(updatedMovieList);
        setMovieListMovies(movieListMovies.concat(movie));
    }

    async function deleteMovieFromMovieList(movie: Movie) {
        console.log("clicked delete movie")

        if (!movieList) {
            console.log("movie list does not exist")
            return;
        }
        movieList.movieIds.push(movie._id);
        const index = movieList.movieIds.findIndex(id => id === movie._id);
        //delete movieList.movieIds[movie._id]
        const updatedMovieList: MovieList | null = await updateMovieList(getToken, movieList);
        console.log('updated movie list', updatedMovieList);
        if (updatedMovieList === null) {
            // TODO: display error message or redirect to 404
            return;
        }

        setMovieList(updatedMovieList);
        const updatedMovieListMovies = movieListMovies.filter(m => m._id !== movie._id);
        setMovieListMovies(updatedMovieListMovies);
    }

    return (
        <MovieListContext.Provider value={{movieList: movieList, movieListMovies: movieListMovies, addMovieToMovieList: addMovieToMovieList, deleteMovieFromMovieList: deleteMovieFromMovieList}}>
            {props.children}
        </MovieListContext.Provider>
    );
};

export function useMovieListContext() {
    return useContext(MovieListContext);
}