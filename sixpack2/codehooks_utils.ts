/**
 * Return the results of a `getMany` query on the given connection inside the collection with the given name and using
 * the given options as an array.
 *
 * @param connection the datastore connection to use
 * @param collectionName the name of the collection to query
 * @param options the options object for limiting results
 * @returns a promise containing the list of matching objects for the given options inside the collection with the given
 * name
 */
export async function getManyFromDatastore<T>(connection: any, collectionName: string, options: any): Promise<T[]> {
    return new Promise<T[]>(async (resolve, reject): Promise<void> => {
        const dataStream = await connection.getMany(collectionName, options);

        let data: T | T[] | null = null;

        dataStream.on('data', (receivedData: T | T[]): void => {
            // Assign the received data into a variable with a shared scope with the 'end' handler since this callback
            // will not be called if no data is returned from the query
            data = receivedData;
        });
        dataStream.on('error', (e: any): void => {
            console.error('Error inside of getMany call: ', e);
            reject(e);
        });
        dataStream.on('end', async (): Promise<void> => {
            // Ensure the return value is always an array even if the query returned a single result
            resolve(data !== null ? (Array.isArray(data) ? data : [data]) : []);
        });
    });
}