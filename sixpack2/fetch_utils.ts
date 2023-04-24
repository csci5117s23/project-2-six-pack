import {HTTP_METHOD} from "next/dist/server/web/http";

/**
 * Make a web request using fetch to the given URL with the given HTTP method and headers.
 *
 * @param url the URL to make a request to
 * @param method the HTTP method to use
 * @param headers the HTTP headers to send
 * @param actionDescription a description of what this request is doing, used in error messages
 * @returns a promise containing the expected JSON data from the response body or `null` if the request failed
 */
export async function makeFetchRequest<T>(url: string, method: HTTP_METHOD, headers: HeadersInit | null, actionDescription: string): Promise<T | null> {
    const response: Response | null = await fetch(url, {
        method: method,
        ...(headers !== null ? {headers: headers} : {})
    }).catch(reason => {
        console.error(`Error while ${actionDescription}, request URL: "`, url, '", request headers: "', headers, '"', reason);
        return null;
    });

    if (response === null) {
        return null;
    }

    const responseContent = await response.json();

    if (!response.ok) {
        console.error(`Non-success status while ${actionDescription}, status: `, response.status, ', request URL: "', url, '", request headers: "', headers, '"');
        return null;
    }

    return responseContent;
}