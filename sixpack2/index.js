
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'


var movieEntries = {
    title: '',
    desc : '',
    imdbID: 0,
    // internalID: 0,
    imageLink: '',
    services: [0],
}

var serviceEntries = {
    name: '',
    serviceID: 0,
}

var user = {
    name: '',
    lists: [0],
    // insert auth stuff here
}

var list = {
    listID : 0,
    listName: '',
    listContents: [0],
}

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

// Use Crudlify to create a REST API for any collection
crudlify(app)

// bind to serverless runtime
export default app.init();
