import axios from 'axios';
import { AirportResponse, FlightData, FlightDetails } from '../constants/IFlightTracker'
import { BACKEND_URL } from '../constants/constants'

export const getResponseFromServer = async (endpoint: string, params: any) => {
    try {
        const resp = await axios.get(`${BACKEND_URL}/${endpoint}`, {
            params: params,
          })
          return resp
    } catch (err) {
        console.error('getResponseFromServer Error: ', err)
    }
}

export const extractFlightData = (apiResponse: any) => {
    const itineraryData: FlightData[] = []
    for (const itinerary of apiResponse.itineraries) {
        let outwardLeg: FlightDetails[] = []
        let returnLeg: FlightDetails[] = []
        let i = 0
        for (const leg of itinerary.legs) {
            let segmentData: FlightDetails[] = []
            for (const segment of leg.segments) {
                const flight = {
                    source: segment.origin.displayCode,
                    destination: segment.destination.displayCode,
                    departureTime: segment.departure,
                    arrivalTime: segment.arrival,
                    price: itinerary.price.formatted,
                    carrierName: segment.operatingCarrier.name,
                };
               segmentData.push(flight)
            }
            if (i === 0) {
                outwardLeg = outwardLeg.concat(segmentData)
                i += 1
            } else {
                returnLeg = returnLeg.concat(segmentData)
            }
            console.log(outwardLeg, returnLeg)
        }
        
        itineraryData.push({
            outwardLeg: ([] as FlightDetails[]).concat(outwardLeg),
            returnLeg: ([] as FlightDetails[]).concat(returnLeg)
        })
        outwardLeg = []
        returnLeg = []
    }
    return itineraryData;

  };

export const arrayFlights = (map: Map<string, string[]>) => {
    const flights = Array.from(map).map(([key, value]) => {
        const parsedKey = JSON.parse(key);
        const price = value[0]; // Assuming only one price in the array
        return {
          outwardLeg: parsedKey.outwardLeg,
          returnLeg: parsedKey.returnLeg,
          price,
        };
      });
    return flights
}

export const mapFlightData = (itineraryData: FlightData[]) => {
    const priceMap = new Map<string, string[]>();
    
    itineraryData.forEach((value: FlightData) => {
        const flightDetails: FlightData = {
            outwardLeg: [],
            returnLeg: []
        }
        const outwardLeg = value.outwardLeg ?? []
        const returnLeg = value.returnLeg ?? []
        let flightPrice = ''
        outwardLeg.forEach((val: FlightDetails) =>{
            flightDetails.outwardLeg?.push({
                source: val.source,
                destination: val.destination,
                departureTime: val.departureTime,
                arrivalTime: val.arrivalTime,
                carrierName: val.carrierName
            })
            flightPrice = val.price ?? ''
        })
        returnLeg.forEach((val: FlightDetails) =>{
            flightDetails.returnLeg?.push({
                source: val.source,
                destination: val.destination,
                departureTime: val.departureTime,
                arrivalTime: val.arrivalTime,
                carrierName: val.carrierName
            })
            flightPrice = val.price ?? ''
        })

        const currObject = priceMap.get(JSON.stringify(flightDetails)) ?? []
        currObject.push(flightPrice)
        
        priceMap.set(JSON.stringify(flightDetails), currObject)
    })

    return priceMap

}

  
  
  

export const getAutoCompleteList = async (query: string) => {
    const airportId: AirportResponse[] =  []
    
   
    const params = {
        query: query,
    }
    const apiResp = await getResponseFromServer('getAutoCompleteList', params);
    if (apiResp?.data.data) {
        for (const airport of apiResp?.data.data) {
            if (airport.navigation.entityType === 'AIRPORT') {
                const currObject = {
                    value: airport.presentation.suggestionTitle,
                    labelId: airport.id,
                    label: airport.presentation.suggestionTitle
                }
                airportId.push(currObject)
            }
        }
    }
    

    return airportId
}