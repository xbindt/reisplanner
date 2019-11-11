import { RESTDataSource } from 'apollo-datasource-rest';

export class nsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:9999/api/';
  }

  async getAllStations() {
    const response = await this.get('stations');
    let arr = Array.isArray(response)
    ? response.filter(station => this.landReducer(station)).map(station => this.stationsReducer(station))
    : [];
    return arr;
  }

  landReducer(station){
    return station.land === 'NL';
  }

  stationsReducer(station){
    return {
      code: station.code,
      names: [
        station.namen
      ],
      synoniemen: station.synoniemen,

    }
  }
};

// https://stackoverflow.com/questions/24806772/how-to-skip-over-an-element-in-map