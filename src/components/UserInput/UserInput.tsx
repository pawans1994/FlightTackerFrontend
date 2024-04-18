import * as React from "react";
import Form from "@cloudscape-design/components/form";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import FormField from "@cloudscape-design/components/form-field";
import { DatePicker } from "@cloudscape-design/components";
import RadioGroup from "@cloudscape-design/components/radio-group";
import Autosuggest, { AutosuggestProps } from "@cloudscape-design/components/autosuggest";
import './userInput.css'
import { AirportResponse, getAutoCompleteList, getResponseFromServer } from "../../util/ApiUtil";

export default function UserInput() {

  const [departureDate, setDepartureDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [source, setSource] = React.useState("");
  const [dest, setDest] = React.useState("");
  const [sourceSuggestions, setSourceSuggestions] = React.useState([{label: "", value: ""}]);
  const [destSuggestions, setDestSuggestions] = React.useState([{label: "", value: ""}]);
  const [tripType, setTripType] = React.useState("oneway")
  const [srcId, setSrcId] = React.useState("")
  const [destId, setDestId] = React.useState("")
  const [sourceErrorMsg, setSourceErrorMsg] = React.useState("")
  const [destErrorMsg, setDestErrorMsg] = React.useState("")
  
  const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>, departureDate: string, returnDate: string, source: string, dest: string, srcId: string, destId: string, tripType: string) => {
    e.preventDefault();
    try {
      if (source.length === 0 && dest.length === 0) {
        setSourceErrorMsg("Field must not be blank")
        setDestErrorMsg("Field must not be blank")
        return
      }
        if (source.length === 0) {
          setSourceErrorMsg("Field must not be blank")
          return
        }
        if (dest.length === 0) {
          setDestErrorMsg("Field must not be blank")
          return
        }
    
        const headers = {
          'X-RapidAPI-Key': '159f65f07emsh451ea3d1ef23233p1a1b7ajsn5ee0e6b24b3b',
          'X-RapidAPI-Host': 'skyscanner80.p.rapidapi.com'
      }
      const params = {
        source: source,
        destination: dest,
        departureDate: departureDate,
        returnDate: returnDate,
        sourceId: srcId,
        destinationId: destId,
        tripType: tripType,
        headers: headers,
        
    }
        const resp = await getResponseFromServer('flightTrack', params)
        console.log('Response: ', resp)
    } catch(e) {
        console.log('Error', e)
    }
}

  const handleSourceChange = async (sourceInput: string) => {
    setSource(sourceInput);
    if (sourceInput.length === 0) {
      setSourceSuggestions([{label: "", value: ""}])
    } else if (sourceInput !== undefined && sourceInput.length > 0) {
      setSourceErrorMsg("")
      const suggestions = await getAutoCompleteList(sourceInput);
      const suggestionsList: AirportResponse[] = []
      suggestions.forEach((record: AirportResponse) => suggestionsList.push(record))
      setSourceSuggestions(suggestionsList);
    }
  }

  const handleDestinationChange = async (destinationInput: string) => {
    setDest(destinationInput);
    if (destinationInput.length === 0) {
      setDestSuggestions([{label: "", value: ""}])
    } else if (destinationInput !== undefined && destinationInput.length > 0) {
      setDestErrorMsg("")
      const suggestions = await getAutoCompleteList(destinationInput);
      const suggestionsList: AirportResponse[] = []
      suggestions.forEach((record: AirportResponse) => suggestionsList.push(record))
      setDestSuggestions(suggestionsList);
    }
  }
  const handleSourceSelect = async (selectOption: AutosuggestProps.SelectDetail) => {
    const airportId =(selectOption.selectedOption as any).labelId ?? ''
    setSrcId(airportId);
  }

  const handleDestinationSelect = async (selectOption: AutosuggestProps.SelectDetail) => {
    const airportId = (selectOption.selectedOption as any).labelId ?? ''
    setDestId(airportId);
  }
    return (
      <>
      <form onSubmit={e => handleSubmit(e, departureDate, returnDate, source, dest, srcId, destId, tripType)}>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button formAction="none" variant="link">
                Cancel
              </Button>
              <Button variant="primary">Submit</Button>
            </SpaceBetween>
          }
          header={<Header variant="h1">Flight Tracker</Header>}
        >
          <Container
            header={
              <Header variant="h2">
                Track Flight Prices
              </Header>
            }
          >
          <Header variant="h3">
            Trip Type
          </Header>

          <RadioGroup
            onChange={({ detail }) => setTripType(detail.value)}
            value={tripType}
            items={[
              { value: "oneway", label: "One Way" },
              { value: "roundtrip", label: "Round Trip" },
            ]}
          />
          <SpaceBetween direction="vertical" size="l">
            <FormField label="Source" errorText={sourceErrorMsg}>
            <Autosuggest
              onChange={({ detail }) => handleSourceChange(detail.value.trim())}
              value={source}
              options={sourceSuggestions}
              ariaLabel="Autosuggest example with suggestions"
              placeholder="Enter value"
              empty="No matches found"
              onSelect={({ detail }) => handleSourceSelect(detail )}
              loadingText="Loading Airports"
              statusType="loading"
            />
            </FormField>
            <FormField label="Destination" errorText={destErrorMsg}>
            <Autosuggest
              onChange={({ detail }) => {
                
                handleDestinationChange(detail.value.trim())
              }}
              value={dest}
              options={destSuggestions}
              ariaLabel="Autosuggest example with suggestions"
              placeholder="Enter value"
              empty="No matches found"
              onSelect={({ detail }) => handleDestinationSelect(detail)}
              loadingText="Loading Airports"
              statusType="loading"
            />
            </FormField>
            <FormField label="Departure Date"
      constraintText="Use YYYY/MM/DD format.">
            <DatePicker
        onChange={({ detail }) => setDepartureDate(detail.value)}
        value={departureDate}
        openCalendarAriaLabel={selectedDate =>
          "Choose certificate expiry date" +
          (selectedDate
            ? `, selected date is ${selectedDate}`
            : "")
        }
        placeholder="YYYY/MM/DD"
          />
            </FormField>

            {tripType === 'roundtrip' && <FormField label="Return Date"
      constraintText="Use YYYY/MM/DD format.">
            <DatePicker
        onChange={({ detail }) => setReturnDate(detail.value)}
        value={returnDate}
        openCalendarAriaLabel={selectedDate =>
          "Choose certificate expiry date" +
          (selectedDate
            ? `, selected date is ${selectedDate}`
            : "")
        }
        placeholder="YYYY/MM/DD"
          />
            </FormField>
}
          </SpaceBetween>
          </Container>
        </Form>
      </form>
      </>
    );
}