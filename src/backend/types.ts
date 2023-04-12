export type Service = {
    _id: string;
    name: string;
    iconURL: string;
};

export type ServiceEntry = {
    _id: string;
    link: string;
    serviceID: string;
};

export type Movie = {
    _id: string;
    title: string;
    description: string;
    imdbID: string;
    imageLink: string;
    services: ServiceEntry[];
};

export type MovieList = {
    _id: string;
    creatorID: string;
    name: string;
    movieIDs: string[];
};