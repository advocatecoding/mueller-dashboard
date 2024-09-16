export interface Store {
    storeNumber: string;
    storeName: string;
    companyName: string;
    city: string;
    zip: string;
    longitude: number;
    latitude: number;
    sections: string;
    link: string;
}

export interface Filters {
    region: string;
    sections: string[];
}
