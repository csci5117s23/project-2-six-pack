import {makeFetchRequest} from "./fetch_utils";

const MOTN_API_KEY = process.env.MOTN_API_KEY!;
const MOTN_API_HOST = process.env.MOTN_API_HOST!;

export type MotnStreamingType = {
    /**
     * The name of the type of streaming, e.g. addon, rent, buy
     */
    type: string;
    /**
     * Description of the quality, e.g. uhd
     */
    quality: string;
    addOn: string;
    /**
     * A URL where this movie can be viewed on the service
     */
    link: string;
    /**
     * A direct URL to watch this movie on the service, may be empty
     */
    watchLink: string;
    audios: {
        language: string;
        region: string;
    }[];
    subtitles: {
        locale: {
            language: string;
            region: string;
        },
        closedCaptions: boolean;
    }[];
    price: {
        amount: string;
        currency: string;
        formatted: string;
    } | null;
    /**
     * 0 == not leaving?
     */
    leaving: number;
    availableSince: number;
};

export type MotnStreamingServicesInformation = Record<string, MotnStreamingType[]>

export type MotnGetServicesResponse = {
    /**
     * The type of the media, e.g. movie
     */
    type: string;
    /**
     * The title of the media
     */
    title: string;
    /**
     * A description of the media
     */
    overview: string;
    /**
     * A map between two-character country codes and the respective country's streaming information
     */
    streamingInfo: Record<string, MotnStreamingServicesInformation>;
}

export type MotnResponseWrapper<T> = {
    result: T;
};

async function makeMotnApiCall<T>(url: string, actionDescription: string): Promise<MotnResponseWrapper<T> | null> {
    return await makeFetchRequest<MotnResponseWrapper<T>>(url, 'GET', {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': MOTN_API_KEY,
        'X-RapidAPI-Host': MOTN_API_HOST
    }, actionDescription);
}

export async function getStreamingServicesForMovieWithTmdbId(movieTmdbId: number): Promise<Record<string, MotnStreamingType[]> | null> {
    const motnResponse = await makeMotnApiCall<MotnGetServicesResponse>(
        `https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&tmdb_id=movie/${movieTmdbId}&output_language=en`,
        'retrieving streaming services for movie');
    if (motnResponse === null) {
        return null;
    }

    const unitedStatesStreamingInformation = motnResponse.result.streamingInfo['us'];
    if (unitedStatesStreamingInformation === undefined) {
        return {};
    }

    return unitedStatesStreamingInformation;
}
