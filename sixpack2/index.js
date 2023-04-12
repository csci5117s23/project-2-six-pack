import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import {array, object, string} from 'yup';
import jwtDecode from 'jwt-decode';

const serviceSchema = object({
    name: string().required(),
    iconURL: string().required()
});

const serviceEntrySchema = object({
    link: string().required(),
    serviceID: string().required(),
});

const movieSchema = object({
    title: string().required(),
    description: string().required(),
    imdbID: string().required(),
    imageLink: string().required(),
    services: array.of(serviceEntrySchema),
});

const movieListSchema = object({
    creatorID: string().required(),
    name: string().required(),
    movieIDs: array.of(string()),
});

async function createMovieEntry(req, res) {
    const conn = await Datastore.open();
    // formatting code here return stringified res
    var res;
    const doc = await conn.insertOne('movieEntries', res);
    // return new document to client
    res.status(201).json(doc);
}

async function getMovieEntry(req, res) {
    const conn = await Datastore.open();
    // formatting code here return target
    var target;
    const id = {target};
    const data = await conn.getOne('movieEntries', id);
    res.json(data)
}

async function createServiceEntry(req, res) {
    const conn = await Datastore.open();
    // formatting code here return stringified res
    var res;
    const doc = await conn.insertOne('serviceEntries', res);
    // return new document to client
    res.status(201).json(doc);
}

async function getServiceEntry(req, res) {
    const conn = await Datastore.open();
    // formatting code here return target
    var target;
    const id = {target};
    const data = await conn.getOne('serviceEntries', id);
    res.json(data)
}

async function createUserEntry(req, res) {
    const conn = await Datastore.open();
    // formatting code here return stringified res
    var res;
    const doc = await conn.insertOne('user', res);
    // return new document to client
    res.status(201).json(doc);
}

async function getUserEntry(req, res) {
    const conn = await Datastore.open();
    // formatting code here return target
    var target;
    const id = {target};
    const data = await conn.getOne('user', id);
    res.json(data)
}

async function createListEntry(req, res) {
    const conn = await Datastore.open();
    // formatting code here return stringified res
    var res;
    const doc = await conn.insertOne('list', res);
    // return new document to client
    res.status(201).json(doc);
}

async function getListEntry(req, res) {
    const conn = await Datastore.open();
    // formatting code here return target
    var target;
    const id = {target};
    const data = await conn.getOne('list', id);
    res.json(data)
}

app.post('/movie', createMovieEntry);
app.get('/movie', getMovieEntry);

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

crudlify(app, {'movie-list': movieListSchema});

// TODO: add routes to update movies which will modify serviceSchema, serviceEntrySchema, and movieSchema

// bind to serverless runtime
export default app.init();
