import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import {array, object, string} from 'yup';
import jwtDecode from 'jwt-decode';

/**
 * A schema representing a streaming service
 */
const serviceSchema = object({
    /**
     * The name of the streaming service
     */
    name: string().required(),
    /**
     * A URL pointing to an icon image for the service
     */
    iconURL: string().required()
});

/**
 * A schema representing a link between a movie and a streaming service
 */
const serviceEntrySchema = object({
    /**
     * A URL pointing to where the user can view the movie this service entry is for on the service with the associated
     * `serviceID`.
     */
    link: string().required(),
    /**
     * The ID of the service in the `serviceSchema` that this entry is linking to
     */
    serviceID: string().required(),
});

/**
 * A schema representing a movie and the streaming services it can be viewed on
 */
const movieSchema = object({
    /**
     * The title of the movie
     */
    title: string().required(),
    /**
     * A description for the movie
     */
    description: string().required(),
    /**
     * The IMDB ID for this movie
     */
    imdbID: string().required(),
    /**
     * A link to a preview image for this movie
     */
    imageLink: string().required(),
    /**
     * The services this movie can be viewed on
     */
    services: array.of(serviceEntrySchema),
});

/**
 * A schema representing a collection of movies a user has created
 */
const movieListSchema = object({
    /**
     * The Clerk ID of the user that created this list
     */
    creatorID: string().required(),
    /**
     * The name of this list
     */
    name: string().required(),
    /**
     * The IDs of the movies contained in this list
     */
    movieIDs: array.of(string()).required(),
});

/**
 * Creates an entry in the `movie` collection with the contents of the given request body.
 *
 * @param request the request made to create a movie into
 * @returns {Promise<Object>} a promise that will resolve into the movie object added to the `DataStore`
 */
async function createMovieEntry(request) {
    const connection = await Datastore.open();
    return await connection.insertOne('movie', request.body);
}

// Authentication middleware adapted from example tech stack: https://github.com/csci5117s23/Tech-Stack-2-Kluver-Demo/blob/main/backend/index.js
// Step 1: Save the given authentication token for future middleware functions
app.use(async (request, _response, next) => {
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
app.use('/movie-list', (request, response, next) => {
    const userId = request.userToken?.sub;
    if (userId === null) {
        // Authentication is required
        response.status(401).end();
        return;
    }

    // Modify either the request body or the query by inserting the authenticated user's ID.
    if (request.method === "POST") {
        request.body.creatorID = userId;
    } else if (request.method === "GET") {
        request.query.creatorID = userId;
    }
    next();
});

// Step 3: Ensure the authenticated user is accessing its own resources
app.use('/todos/:id', async (request, response, next) => {
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
        const todo = await connection.getOne('movie-list', id)
        if (todo.creatorID !== userId) {
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

// Use Crudlify to create a REST API for any collection
crudlify(app, {'movie-list': movieListSchema});

// TODO: add routes to update movies which will modify serviceSchema, serviceEntrySchema, and movieSchema

// bind to serverless runtime
export default app.init();
