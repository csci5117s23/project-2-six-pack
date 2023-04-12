
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import * as yup from 'yup';

var movieEntries = {
    title: '',
    desc : '',
    imdbID: 0,
    // internalID: 0,
    imageLink: '',
    services: [0],
}

let movieEntries =
  yup.object().shape({
    title: yup.string().required(),
    desc: yup.string().required(),
    imdbID: yup.number().required(),
    imageLink: yup.string().required(),
    products: yup.array().of(
        yup.object({
            services: yup.number().required()
        })
      ),
  })


var serviceEntries = {
    name: '',
    serviceID: 0,
}

let serviceEntries =
    yup.object().shape({
        name: yup.string().required(),
        serviceID: yup.number().required(),
    })


// // product schema, any json is allowed
// let product = yup.object().shape({
//   json: yup.mixed()
// })

// Add CRUD routes with yup schema for two collections

var user = {
    name: '',
    lists: [0],
    // insert auth stuff here
}

let user =
    yup.object().shape({
        name: yup.string().required(),
        lists: yup.array().of(
            yup.object({
                listID: yup.number().required()
            })
            ),
    })

var list = {
    listID : 0,
    listName: '',
    listContents: [0],
}

let list =
    yup.object().shape({
        listID: yup.number().required(),
        listName: yup.string().required(),
        listContents: yup.array().of(
            yup.object({
                movieID: yup.number().required()
            })
            ),
    })




// Use Crudlify to create a REST API for any collection
crudlify(app, {movieEntries, customer, serviceEntries, user, list})

// bind to serverless runtime
export default app.init();
