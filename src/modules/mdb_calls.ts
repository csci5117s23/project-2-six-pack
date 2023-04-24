import { GetToken } from "@clerk/types";
import { Movie, MovieList, ServiceEntry } from "@/modules/types";
import { HTTP_METHOD } from "next/dist/server/web/http";
// https://developers.themoviedb.org/3/getting-started/introduction
const TMDB_URL_ROOT = process.env.TMDB_URL_ROOT;
const TMDB_URL_END = process.env.TMDB_URL_END;
const TBDB_API_KEY = process.env.TMDB_V3_API_KEY;
const MOTN_API_KEY = process.env.MOTN_API_KEY;
const MOTN_API_HOST = process.env.MOTN_API_HOST;


// Make fetch call with url path
async function tmdbCall(path) {
    const url = TMDB_URL_ROOT+path;
    const options = {
        method: 'GET',
        headers: {
            // 'content-type' : ''
                }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

async function motnCall(path) {
    const url = path;
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': MOTN_API_KEY,
            'X-RapidAPI-Host': MOTN_API_HOST
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}


// Send in list of search queries eg [["query", "movie name"], ["year", "2021"]]
// returns a path for fetch request
function searchPathGenerator(pathVars) {
    let path = "?api_key=" + TBDB_API_KEY;
    for (let i = 0; i < pathVars.length; i++) {
        path += "&" + pathVars[i][0] + "=" + pathVars[i][1];
    }
    path += TMDB_URL_END;
    return path;
}

function movieFinder(queryParams) {
    let path = searchPathGenerator(queryParams);
    return tmdbCall(path);
}

function genreFinder() {
    let path = "genre/movie/list?api_key=" + TBDB_API_KEY + TMDB_URL_END;
    return tmdbCall(path);
}

function streamingServiceGrabber(mediaId) {
    let path = "https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&tmdb_id="+mediaId+"&output_language=en";
    return motnCall(path);
}

