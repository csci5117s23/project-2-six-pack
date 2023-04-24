import {MotnStreamingType} from "../../sixpack2/motn_impl";

export type Movie = {
    /**
     * The Codehooks ID of this movie
     */
    _id: string;
    title: string;
    description: string;
    /**
     * The release date of this movie in YYYY-MM-DD format
     */
    releaseDate: string;
    /**
     * The TMDB ID of this movie
     */
    tmdbId: number;
    /**
     * The ending path component of the URL to access the poster image for this movie. To access the poster image,
     * append this value to `https://image.tmdb.org/t/p/original`
     */
    posterImageUrlPath: string | null;
    /**
     * The ending path component of the URL to access the poster image for this movie. To access the poster image,
     * append this value to `https://image.tmdb.org/t/p/original`
     */
    backdropImageUrlPath: string | null;
    /**
     * If the streaming services have not yet been loaded for this movie, `null`. Otherwise, a map between the service
     * name and the ways that this movie can be watched on the service.
     */
    services: Record<string, MotnStreamingType[]> | null;
};

export type MovieList = {
    _id: string;
    creatorId: string;
    name: string;
    movieIds: string[];
};