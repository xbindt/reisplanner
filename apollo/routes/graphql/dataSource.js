import { RESTDataSource } from 'apollo-datasource-rest';
import cors from 'cors';

export class nsAPI extends RESTDataSource {
  constructor() {
    super();
    this.cors = cors();
    this.baseURL = 'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/';
  }

  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json');
    request.headers.set('Ocp-Apim-Subscription-Key', '035305e8c28f45e28a772d6c5b045ad4');
  }

  async getAllStations() {
    const response = await this.get('stations');
    let arr = Array.isArray(response.payload)
    ? response.payload.filter(station => this.landReducer(station))
    : [];
    return arr;
  }

  // .map(DepartureTime => this.departureReducer(DepartureTime))

  async getDepartures(code) {
    const response = await this.get(`departures?station=${code}`);
    let arr = Array.isArray(response.payload.departures)
    ? response.payload.departures : [];
    return arr;
  }

  landReducer(station){
    return station.land === 'NL';
  }

  departureReducer(DepartureTime){
    return {
      plannedDateTime: DepartureTime.plannedDateTime,
      actualDateTime: DepartureTime.actualDateTime,
      messages: DepartureTime.messages,
      direction: DepartureTime.direction,
      actualTrack: DepartureTime.actualTrack,
      plannedTrack: DepartureTime.plannedTrack,
    }
  }

  stationsReducer(station){
    return {
      code: station.code,
      namen: station.namen,
      synoniemen: station.synoniemen,
    }
  }
};

// https://stackoverflow.com/questions/24806772/how-to-skip-over-an-element-in-map
// https://dev.to/doylecodes/cors-in-apollo-client-apollo-server-3cbj
