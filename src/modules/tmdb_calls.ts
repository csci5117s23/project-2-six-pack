import { GetToken } from "@clerk/types";
import { Movie, MovieList, ServiceEntry } from "@/modules/types";
import { HTTP_METHOD } from "next/dist/server/web/http";
// https://developers.themoviedb.org/3/getting-started/introduction
const TMDB_URL_ROOT = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
const TMDB_URL_END = "&language=en-US&page=1&include_adult=false";
const TBDB_API_KEY = "Test";//process.env.TMDB_API_KEY;

async function makeTMDBApiCall<ResponseType>(getToken: GetToken, path: string, method: HTTP_METHOD, body: any | null, actionDescription: string): Promise<ResponseType | null> {
    const token: string | null = await getToken({ template: "codehooks" }).catch(reason => {
        console.error('Error while retrieving token:', reason);
        return null;
    });
    if (token === null) {
        return null;
    }

    const response: Response | null = await fetch(`${path}`, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            ...(body !== null ? { 'Content-Type': 'application/json' } : {})
        },
        ...(body !== null ? { body: JSON.stringify(body) } : {})
    }).catch(reason => {
        console.error(`Error while ${actionDescription}, request path: "`, path, '", request body: "', body, '"', reason);
        return null;
    });

    if (response === null) {
        return null;
    }

    const responseContent = await response.json();

    if (!response.ok) {
        console.error(`Non-success status while ${actionDescription}, status: `, response.status, ', request path: "', path, '", request body: "', body, '"');
        return null;
    }

    return responseContent;
}
// Send in list of search queries eg [["query", "movie name"], ["year", "2021"]]
// returns a path for fetch request
function pathGenerator(pathVars) {
    let path = "?api_key="+TBDB_API_KEY;
    for (let i = 0; i < pathVars.length; i++) {
        path += "&"+pathVars[i][0]+"="+pathVars[i][1];
    }
    return path;
}

export async function SearchTmdbByMovie(getToken: GetToken, mediaId: string): Promise<Movie | null> {
    return await makeTMDBApiCall<Movie>(getToken, `movie?${mediaId}`, 'GET', null, 'retrieving media information from tmdb by name');
}

