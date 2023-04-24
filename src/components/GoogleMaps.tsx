import React, { useState } from "react";
//import NextCors from "nextjs-cors";

const gmapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function GoogleMaps() {
    const [latitude, setLatitude] = useState<any>(null);
    const [longitude, setLongitude] = useState<any>(null);

    const [status, setStatus] = useState(null);

    // async function handler(any: req, res) {
    //     // Run the cors middleware
    //     // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    //     await NextCors(req, res, {
    //        // Options
    //        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    //        origin: '*',
    //        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    //     });
     
    //     // Rest of the API logic
    //     res.json({ message: 'Hello NextJs Cors!' });
    //  }

    // CORS issue happens here. Will need to use google's api loader package
    async function getNearbyTheaters() {
        const result = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?types=movie_theatre&location=${latitude},${longitude}&radius=500&sensor=true&key=${gmapsApiKey}`,{
            'method':'GET',
            'headers': {
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:3000/gmaps',
                'Content-type': 'application/json'
            }
        })
        return await result.json();
    }

    const retrieveLocation = () => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser")
        } else {
            console.log("gmaps api key: ", gmapsApiKey);
            navigator.geolocation.getCurrentPosition( (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            })
        }
    };

    const retrieveNearbyTheaters = () => {
        console.log("nearby theaters: ", getNearbyTheaters());

    };

    return <>
        <div>
            <button onClick={retrieveLocation}>Find location</button>
            <h2>Coords</h2>
            <p>Latitude: { latitude }</p>
            <p>Longitude: { longitude }</p>
        </div>
        <div>
            <button onClick={retrieveNearbyTheaters}>Find nearest theaters</button>
            <h2>Coords</h2>
            <p>Latitude: { latitude }</p>
            <p>Longitude: { longitude }</p>
        </div>
    </>
}

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?types=movie_theatre&location=12.987162,77.510551&radius=500&sensor=true&key="my_api_key".
// https://maps.googleapis.com/maps/api/place/radarsearch/json?location=51.503186,-0.126446&radius=5000&types=movie+theater&key=YOUR_API_KEY
