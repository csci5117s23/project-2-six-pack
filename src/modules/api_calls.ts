import {GetToken} from "@clerk/types";
import {Movie, MovieList} from "@/modules/types";
import {HTTP_METHOD} from "next/dist/server/web/http";
import {TmdbMovieGenre} from "../../sixpack2/tmdb_impl";
import {MotnStreamingType} from "../../sixpack2/motn_impl";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

async function makeApiCall<ResponseType>(getToken: GetToken, path: string, method: HTTP_METHOD, body: any | null, actionDescription: string): Promise<ResponseType | null> {
    const token: string | null = await getToken({template: "codehooks"}).catch(reason => {
        console.error('Error while retrieving token:', reason);
        return null;
    });
    if (token === null) {
        return null;
    }

    const response: Response | null = await fetch(`${BACKEND_BASE_URL}/${path}`, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            ...(body !== null ? {'Content-Type': 'application/json'} : {})
        },
        ...(body !== null ? {body: JSON.stringify(body)} : {})
    }).catch(reason => {
        console.error(`Error while ${actionDescription}, request path: "`, path, '", request body: "', body, '"', reason);
        return null;
    });

    if (response === null) {
        return null;
    }

    const responseContent = await response.json();

    if (!response.ok) {
        console.error(`Non-success status while ${actionDescription}, status: `, response.status, ', request path: "', path, '", request body: "', body, '"');
        return null;
    }

    return responseContent;
}

export async function getOrCreateInitialMovieList(getToken: GetToken): Promise<MovieList | null> {
    return await makeApiCall<MovieList>(getToken, 'initial-movie-list', 'GET', null, 'retrieving initial movie list');
}

export async function getMovieListById(getToken: GetToken, listId: string): Promise<MovieList | null> {
    return await makeApiCall<MovieList>(getToken, `movielist/${listId}`, 'GET', null, 'retrieving movie by ID');
}

export async function addMovieList(getToken: GetToken, movieList: MovieList): Promise<MovieList | null> {
    return await makeApiCall<MovieList>(getToken, 'movielist', 'POST', movieList, 'adding movie list');
}

export async function deleteMovieList(getToken: GetToken, movieList: MovieList): Promise<{ _id: string } | null> {
    return await makeApiCall<{
        _id: string
    }>(getToken, `movielist/${movieList._id}`, 'DELETE', null, 'deleting movie list');
}

export async function updateMovieList(getToken: GetToken, movieList: MovieList): Promise<MovieList | null> {
    return await makeApiCall<MovieList>(getToken, `movielist/${movieList._id}`, 'PUT', movieList, 'updating movie list');
}

export async function searchMoviesByTitle(getToken: GetToken, mediaTitle: string): Promise<Movie[] | null> {
    return await makeApiCall<Movie[]>(getToken, `search-movies/${mediaTitle}`, 'GET', null, 'searching media by title');
}

export async function getTmdbMovieGenres(getToken: GetToken): Promise<TmdbMovieGenre[] | null> {
    return await makeApiCall<TmdbMovieGenre[]>(getToken, 'movie-genres', 'GET', null, 'retrieving TMDB movie genres');
}

export async function getMediaInfo(getToken: GetToken, mediaId: string): Promise<Movie | null> {
    return await makeApiCall<Movie>(getToken, `media/${mediaId}`, 'GET', null, 'retrieving media information by id');
}

export async function getMediaStreamingService(getToken: GetToken, mediaId: string): Promise<Record<string, MotnStreamingType[]> | null> {
    return await makeApiCall<Record<string, MotnStreamingType[]>>(getToken, `streaming-services/${mediaId}`, 'GET', null, 'retrieving streaming services for media by id');
}
