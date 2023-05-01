import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import {array, object, string} from 'yup';
import jwtDecode from 'jwt-decode';
import {Movie, MovieList} from "../src/modules/types";
import {getStreamingServicesForMovieWithTmdbId} from "./motn_impl";
import {
    getTmdbGenres,
    searchTmdbMoviesByQuery, TmdbErrorResponse,
    TmdbMovieGenresResult,
    TmdbMovieSearchResult,
    TmdbMovieSearchResults
} from "./tmdb_impl";
import {getManyFromDatastore} from "./codehooks_utils";

/**
 * A schema representing a collection of movies a user has created
 */
const movieListSchema = object({
    /**
     * The Clerk ID of the user that created this list
     */
    creatorId: string().required(),
    /**
     * The name of this list
     */
    name: string().required(),
    /**
     * The IDs of the movies contained in this list
     */
    movieIds: array().of(string()).required(),
});

// Authentication middleware adapted from example tech stack: https://github.com/csci5117s23/Tech-Stack-2-Kluver-Demo/blob/main/backend/index.js
// Step 1: Save the given authentication token for future middleware functions
app.use(async (request: any, _response: any, next: any): Promise<void> => {
    try {
        const {authorization} = request.headers;
        if (authorization) {
            const token = authorization.replace('Bearer ', '');
            // Note: jwtDecode does not validate the token, codehooks does
            request.userToken = jwtDecode(token);
        }
        next();
    } catch (error) {
        next(error);
    }
});

// Step 2: Only allow the user to make requests for their movie lists
app.use('/movielist', (request: any, response: any, next: any): void => {
    const userId = request.userToken?.sub;
    if (userId === null) {
        // Authentication is required
        response.status(401).end();
        return;
    }

    // Modify either the request body or the query by inserting the authenticated user's ID.
    if (request.method === "POST") {
        request.body.creatorId = userId;
    } else if (request.method === "GET") {
        request.query.creatorId = userId;
    }
    next();
});

// Step 3: Ensure the authenticated user is accessing its own resources
app.use('/movielist/:id', async (request: any, response: any, next: any): Promise<void> => {
    const id = request.params.ID;
    const userId = request.userToken?.sub;
    if (userId === null) {
        // Authentication is required
        response.status(401).end();
        return;
    }

    // Ensure the user requesting the movie list to be read/updated/replaced/deleted is the creator
    const connection = await Datastore.open();
    try {
        const movieList = await connection.getOne('movielist', id);
        if (movieList.creatorId !== userId) {
            // The authenticated user doesn't own this movie list
            response.status(403).end();
            return;
        }
    } catch (e) {
        console.log(e);
        // The movie list with the queried id doesn't exist.
        response.status(404).end(e);
        return;
    }

    // Call crudlify implementation
    next();
});

app.get('/initial-movie-list', async (request: any, response: any): Promise<void> => {
    const userId = request.userToken?.sub;
    if (userId === null) {
        // Authentication is required
        response.status(401).end();
        return;
    }

    const connection = await Datastore.open();
    try {
        // Get the first movie list created by the user
        let movieLists: MovieList[] | null = await getManyFromDatastore(connection, 'movielist', {
            filter: {
                'creatorId': userId,
            },
            limit: 1
        });

        if (movieLists.length === 0) {
            // Create the initial movie list for the user
            const movieList = await connection.insertOne('movielist', {
                creatorId: userId,
                name: 'My First List',
                movieIds: [],
            });

            response.status(201).json(movieList);
        } else {
            // Send the existing movie list back to the client
            response.json(movieLists[0]);
        }
    } catch (e) {
        console.error(e);
        response.status(500).end(e);
    }
});

app.get('/media/:id', async (request: any, response: any): Promise<void> => {
    if (request.userToken?.sub === null) {
        // Authentication is required
        response.status(401).end();
        return;
    }

    const connection = await Datastore.open();

    try {
        const id = request.params.id;

        response.json(await connection.getOne('media', id));
    } catch (e) {
        console.error(e);
        response.status(500).end(e);
    }
});

app.get('/streaming-services/:id', async (request: any, response: any): Promise<void> => {
    if (request.userToken?.sub === null) {
        // Authentication is required
        response.status(401).end();
        return;
    }

    const connection = await Datastore.open();

    try {
        const id = request.params.id;

        const movie: Movie = await connection.getOne('media', id);

        if (movie.services === null) {
            movie.services = await getStreamingServicesForMovieWithTmdbId(movie.tmdbId);
            await connection.updateOne('media', movie._id, movie);
        }

        response.json(movie.services);
    } catch (e) {
        console.error(e);
        response.status(500).end(e);
    }
});

function searchResultToMovie(searchResult: TmdbMovieSearchResult): Movie {
    return {
        // id is not defined so that Codehooks creates a new ID internally
        description: searchResult.overview,
        posterImageUrlPath: searchResult.poster_path,
        backdropImageUrlPath: searchResult.backdrop_path,
        releaseDate: searchResult.release_date,
        services: null,
        title: searchResult.title,
        tmdbId: searchResult.id
    } as Movie;
}

app.get('/search-movies/:title', async (request: any, response: any): Promise<void> => {
    if (request.userToken?.sub === null) {
        // Authentication is required
        response.status(401).end();
        return;
    }

    const searchResults = await searchTmdbMoviesByQuery([['query', request.params.title]]);

    if (searchResults === null || (searchResults as TmdbErrorResponse[])[0] !== undefined && (searchResults as TmdbErrorResponse[])[0]['status_message'] !== undefined) {
        // The search API call failed
        response.status(500).json(searchResults);
        return;
    }

    // Cache returned search results and transform search results into Movie structure
    const connection = await Datastore.open();
    const movies: Movie[] = [];

    for (let searchResult of (searchResults as TmdbMovieSearchResults).results) {
        try {
            const existingMovies: Movie[] = await getManyFromDatastore(connection, 'media', {
                filter: {
                    'tmdbId': searchResult.id,
                },
                limit: 1
            });

            let movie = searchResultToMovie(searchResult);

            if (existingMovies.length === 0) {
                movie = await connection.insertOne('media', movie);
            } else {
                movie = await connection.updateOne('media', existingMovies[0]._id, movie);
            }

            movies.push(movie);
        } catch (e) {
            console.error(e);
            response.status(500).end(e);
            return;
        }
    }

    response.json(movies);
});

app.get('/movie-genres', async (request: any, response: any): Promise<void> => {
    if (request.userToken?.sub === null) {
        // Authentication is required
        response.status(401).end();
        return;
    }

    const genres = await getTmdbGenres();

    if (genres === null || (genres as TmdbErrorResponse[])[0] !== undefined && (genres as TmdbErrorResponse[])[0]['status_message'] !== undefined) {
        // The search API call failed
        response.status(500).json(genres);
        return;
    }

    response.json((genres as TmdbMovieGenresResult).genres);
});

// Use Crudlify to create a REST API for any collection
crudlify(app, {'movielist': movieListSchema});

// bind to serverless runtime
// noinspection JSUnusedGlobalSymbols
export default app.init();
