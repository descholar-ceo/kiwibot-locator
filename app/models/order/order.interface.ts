export default interface Order {
	creation_date: Date;
	state: string;
	pickup: {
		pickup_lat: number;
		pickup_lon: number;
	}

	dropoff: {
		dropoff_lat: number;
		dropoff_lon: number;
	}
	creator_id: string;
	zone_id: string;
}
