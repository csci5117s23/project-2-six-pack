export type Service = {
    name: string;
    iconURL: string;
};

export type ServiceEntry = {
    link: string;
    serviceID: string;
};

export type Movie = {
    title: string;
    description: string;
    imdbID: string;
    imageLink: string;
    services: ServiceEntry[];
};

export type MovieList = {
    creatorID: string;
    name: string;
    movieIDs: string[];
};