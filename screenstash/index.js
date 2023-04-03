
/*
* Auto generated Codehooks (c) example.
*/
import app from 'codehooks-js'

// routehook function
function helloFunc(req, res) {
  console.log("Hello world!", req);
  res.json({"message": "Hello world!"});
}

// REST hook
app.get('/hello', helloFunc);

// bind to serverless runtime
export default app.init();
