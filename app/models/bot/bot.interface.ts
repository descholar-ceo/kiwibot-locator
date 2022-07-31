export default interface Bot {
    status: string;
    location: {
        lat: number;
        lon: number;
    };
    zone_id: string;
}
