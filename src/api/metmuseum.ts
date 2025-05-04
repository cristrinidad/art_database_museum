const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects';
const SEARCH_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search';

// The model of the MuseumObject
export interface MuseumObject {
    objectID: number;
    title: string;
    primaryImage: string;
    primaryImageSmall: string;
    description: string;
    culture: string;
    period: string;
    artistDisplayName: string;
    medium: string;
    country: string;
}

// The model of the response from METMuseum
export interface MuseumObjectIDsResponse {
    total: number;
    objectIDs: number[] | null;
}

// Fetches details for a specific museum object by its ID
export async function getObjectDetails(objectId: number): Promise<MuseumObject | null> {
    const response = await fetch(`${BASE_URL}/${objectId}`);
    if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
        return null;
    }
    return await response.json();
};

// Fetch object Ids of search
export async function searchObjectIds(options: {
    searchText: string,
    location?: string,
    dateBegin?: number,
    dateEnd?: number,
    medium?: string
}): Promise<MuseumObjectIDsResponse> {
    const searchUrl = new URL(SEARCH_URL);
    if (options.location != null && options.location !== '') {
        searchUrl.searchParams.append("geoLocation", options.location);
    }
    if (options.dateBegin != undefined && options.dateEnd !== undefined) {
        searchUrl.searchParams.append("dateBegin", (options.dateBegin).toString());
        searchUrl.searchParams.append("dateEnd", (options.dateEnd).toString());
    }
    if (options.medium != null && options.medium !== '') {
        searchUrl.searchParams.append("medium", options.medium);
    }
    searchUrl.searchParams.append("hasImages", "true");
    searchUrl.searchParams.append("q", options.searchText);
    const response = await fetch(searchUrl.href);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};