import app from 'codehooks-js'
//import {app, Datastore} from 'codehooks-js'


const About = () => {
    async function printStuff() {
        console.log("printing from printstuff");
        const MY_API_KEY = '123'; // NB! Not for production. Use JWT and JWKS for secure API endpoints.
        
        const headersList = {
         "Accept": "*/*",
         "x-api-key": MY_API_KEY,
         "Content-Type": "application/json"
        }
        
        const response = await fetch("https://backend-k8e7.api.codehooks.io/dev/foo", { 
          method: "POST",
          body: "test",
          headers: headersList
        });
        
        const data = await response.json();
        console.log("before");
        console.log(data);
        console.log("after");
    }

    // routehook function
    function helloFunc(req: any, res: any) {
        console.log("Hello world!", req);
        res.json({"message": "Hello world!"});
    }
    
    return (
        <div>
            <h1>
                About
            </h1>
            <button onClick={ printStuff }>Test Codehooks</button>
        </div>
    )
}

export default About;