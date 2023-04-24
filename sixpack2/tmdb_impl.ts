import {makeFetchRequest} from "./fetch_utils";

const TMDB_URL_ROOT = process.env.TMDB_URL_ROOT;
const TMDB_URL_END = process.env.TMDB_URL_END;
const TMDB_API_KEY = process.env.TMDB_V3_API_KEY;

export type TmdbMovieSearchResult = {
    /**
     * The URL path to a poster image for the movie
     */
    poster_path: string | null,
    /**
     * true if this movie is an adult film, false otherwise
     */
    adult: boolean;
    /**
     * A description of the movie
     */
    overview: string;
    /**
     * The release date of the movie in YYYY-MM-DD format
     */
    release_date: string;
    genre_ids: number[];
    id: number;
    /**
     * Title of the movie in the original language
     */
    original_title: string;
    /**
     * The standard identifier for the original language of the movie
     */
    original_language: string;
    /**
     * The English title of the movie
     */
    title: string;
    /**
     * The URL path to a backdrop image for the movie
     */
    backdrop_path: string | null;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
};

export type TmdbMovieSearchResults = {
    /**
     * The page number the contained results are on
     */
    page: number;
    results: TmdbMovieSearchResult[];
    /**
     * The total number of results matching the query
     */
    total_results: number;
    /**
     * The number of pages of results matching the query
     */
    total_pages: number;
};

export type TmdbMovieGenre = {
    id: number;
    name: string;
};

export type TmdbMovieGenresResult = {
    genres: TmdbMovieGenre[];
};

type TmdbErrorResponse = {
    status_message: string;
    status_code: number;
};

async function makeTmdbApiCall<T>(path: string, query: string, actionDescription: string): Promise<T | TmdbErrorResponse[] | null> {
    return await makeFetchRequest<T | TmdbErrorResponse[]>(`${TMDB_URL_ROOT}${path}?api_key=${TMDB_API_KEY}${query}${TMDB_URL_END}`, 'GET', null, actionDescription);
}

/**
 * Converts a list of string tuples into a query string. Each element of the array is a key-value pair for a query
 * option, e.g. `['year', '2021']`.
 *
 * @param queryParameters a list of query parameters to convert into a query string
 */
function createQueryString(queryParameters: [string, string][]): string {
    let path = '';
    for (let i = 0; i < queryParameters.length; i++) {
        path += `&${queryParameters[i][0]}=${queryParameters[i][1]}`;
    }
    return path;
}

export async function searchTmdbMoviesByQuery(queryParameters: [string, string][]) {
    return await makeTmdbApiCall<TmdbMovieSearchResults>('search/movie', createQueryString(queryParameters), 'searching TMDB movies by query');
}

export async function getTmdbGenres() {
    return await makeTmdbApiCall<TmdbMovieGenresResult>("genre/movie/list", '', 'querying TMDB genres');
}