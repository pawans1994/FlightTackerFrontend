import React from 'react';
import { FlightData } from '../../constants/IFlightTracker';


const calculateRange = (flights: FlightData[], rowsPerPage: number) => {
    const range: number[] = []
    const num = Math.ceil(flights.length / rowsPerPage)
    let i = 1;
    for (i = 1; i <= num; i++) {
      range.push(i)
    }
    return range

  }

  const sliceData = (data: FlightData[], page: number, rowsPerPage: number) => {
    console.log(page, rowsPerPage)
    return page > 1 ? data.slice((page-1) * rowsPerPage + 1, page+rowsPerPage) : data.slice((page-1) * rowsPerPage, page+rowsPerPage)
  }

  const useTable = (data: FlightData[], page: number, rowsPerPage: number) => {
    const [tableRange, setTableRange] = React.useState(([] as number[]))
    const [slice, setSlice] = React.useState(([] as FlightData[]))
    React.useEffect(()=>{
        const range = calculateRange(data, rowsPerPage)
        setTableRange([...range])
        const slice = sliceData(data, page, rowsPerPage)
        setSlice([...slice])
    }, [data, setTableRange, page, setSlice, rowsPerPage])

    return { slice, range: tableRange }
  }

  export default useTable;