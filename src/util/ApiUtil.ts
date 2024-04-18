import axios from 'axios';

export interface AirportResponse {
    label: string;
    value: string;
    id?: string;
}

export const getResponseFromServer = async (endpoint: string, params: any) => {
    try {
        const resp = await axios.get(`http://127.0.0.1:5000/${endpoint}`, {
            params: params,
          })
          return resp
    } catch (err) {
        console.error('getResponseFromServer Error: ', err)
    }
}

export const getAutoCompleteList = async (query: string) => {
    const airportId: AirportResponse[] =  []
    
   
    const params = {
        query: query,
    }
    const apiResp = await getResponseFromServer('getAutoCompleteList', params);
    if (apiResp?.data) {
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