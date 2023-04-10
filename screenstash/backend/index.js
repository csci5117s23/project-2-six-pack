
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
//import {app} from 'codehooks-js'
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'

// test route for https://<PROJECTID>.api.codehooks.io/dev/
app.get('/', (req, res) => {
  res.send('CRUD server ready')
})

app.get('/test', (req, res) => {
  //res.send('CRUD server ready')
  res.json({result: "you did it!"});
})


// REST route for serverless function
app.post('/foo', async (req, res) => {
  // connect to the key-value datastore
  const key_val_store = await Datastore.open();
  // set a value
  const setval = await key_val_store.set('foo', 'bar'); // returns 'bar'
  console.debug('setval', setval);
  // get a value
  const getval = await key_val_store.get('foo'); // returns 'bar'
  console.log("getvalue: ", getval);
  //res.status(201).end(`Thank's for setting and getting ${getval}`);
  res.status(201);
  //res.json({getval});
})

// Use Crudlify to create a REST API for any collection
crudlify(app)

// bind to serverless runtime
export default app.init();
