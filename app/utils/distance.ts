const toRadians = (data: number):number => (data * (Math.PI / 180));

export const getDistanceBetweenTwoCoodinates = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371.0710
    const lat1ToRad = toRadians(lat1);
    const lat2ToRad = toRadians(lat2);
    const lon1ToRad = toRadians(lon1);
    const lon2ToRad = toRadians(lon2);
    const latDiff = lat2ToRad - lat1ToRad;
    const lonDiff = lon2ToRad - lon1ToRad;
    const prod1 = Math.sin(latDiff / 2) * Math.sin(latDiff / 2);
    const prod2 = Math.cos(lat1ToRad) * Math.cos(lat2ToRad) * Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    return 2 * R * Math.asin(Math.sqrt(prod1 + prod2));
    // used haversine formula to calculate distance: https://en.wikipedia.org/wiki/Haversine_formula
}
