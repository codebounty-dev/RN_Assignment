const UrlsMapping: any = {
    "assignmentapp://hotels-in-bangalore": "www.treebo.com/hotels-in-bangalore/",
    "assignmentapp://hotels-in-ooty": "www.treebo.com/hotels-in-ooty/",
    "assignmentapp://hotels-in-delhi": "www.treebo.com/hotels-in-delhi/",
    "assignmentapp://hotels-in-indore": "www.treebo.com/hotels-in-indore/",
}


export const getUrlFromDeepLink = (deepUrl: string) => {
    if (UrlsMapping[deepUrl]) {
        return UrlsMapping[deepUrl]
    }
    return "https://www.treebo.com/"
}