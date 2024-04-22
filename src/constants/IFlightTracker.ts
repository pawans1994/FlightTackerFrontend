export interface AirportResponse {
    label: string;
    value: string;
    id?: string;
}

export interface FlightDetails {
    source: string;
    destination: string;
    price?: string;
    departureTime: string;
    arrivalTime: string;
    carrierName: string;
}

export interface FlightData {
  outwardLeg?: FlightDetails[];
  returnLeg?: FlightDetails[];
  price?: string;
}
