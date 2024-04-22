import React from 'react';
import { FlightData } from '../../constants/IFlightTracker';
import './FlightTable.css'
import useTable from '../../hooks/TablePagination/UseTable';
import Pagination from "@cloudscape-design/components/pagination";

interface FlightTableProps {
    flights: FlightData[]
}

const FlightTable: React.FC<FlightTableProps> = ({ flights }) => {

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const { slice, range } = useTable(flights, currentPage, itemsPerPage)

  return (
    <>
    <table className="table">
      <thead className='tableRowHeader'>
        <tr>
          <th className='tableHeader'>S.No.</th>
          <th className='tableHeader'>Leg</th>
          <th className='tableHeader'>Carrier Name</th>
          <th className='tableHeader'>Source</th>
          <th className='tableHeader'>Destination</th>
          <th className='tableHeader'>Departure Time</th>
          <th className='tableHeader'>Arrival Time</th>
          <th className='tableHeader'>Price</th>
        </tr>
      </thead>
      <tbody>
        {slice.map((flight, index) => (
          <React.Fragment key={index}>
            {(flight.outwardLeg ?? []).map((leg, legIndex) => (
              <tr className = 'tableRowItems' key={`outward__${index}_${legIndex}`}>
                {legIndex === 0 && (
                  <td className ='table-data' rowSpan={(flight.outwardLeg ?? []).length}>{index + 1}</td>
                )}
                <td className='table-data'>Outward</td>
                <td className='table-data'>{leg.carrierName}</td>
                <td className='table-data'>{leg.source}</td>
                <td className='table-data'>{leg.destination}</td>
                <td className='table-data'>{leg.departureTime}</td>
                <td className='table-data'>{leg.arrivalTime}</td>
                {legIndex === 0 && (
                  <td className ='table-data' rowSpan={(flight.outwardLeg ?? []).length}>{flight.price}</td>
                )}
              </tr>
            ))}
            {(flight.returnLeg ?? []).map((leg, legIndex) => (
              <tr className = 'tableRowItems' key={`return_${index}_${legIndex}`}>
                {legIndex === 0 && (
                  <td className ='table-data' rowSpan={(flight.returnLeg ?? []).length}>{index + 1}</td>
                )}
                <td className='table-data'>Return</td>
                <td className='table-data'>{leg.carrierName}</td>
                <td className='table-data'>{leg.source}</td>
                <td className='table-data'>{leg.destination}</td>
                <td className='table-data'>{leg.departureTime}</td>
                <td className='table-data'>{leg.arrivalTime}</td>
                {legIndex === 0 && (
                  <td className ='table-data' rowSpan={(flight.returnLeg ?? []).length}>{flight.price}</td>
                )}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    <div className='pageNavigation'>
      <Pagination
        currentPageIndex={currentPage}
        onChange={({ detail }) =>
          setCurrentPage(detail.currentPageIndex)
        }
        pagesCount={Math.ceil(flights.length/itemsPerPage)}
      />
    </div>
    </>
  );
  
};

export default FlightTable;