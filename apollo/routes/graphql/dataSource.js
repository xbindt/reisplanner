import { RESTDataSource } from 'apollo-datasource-rest';
import cors from 'cors';

export class nsAPI extends RESTDataSource {
  constructor() {
    super();
    this.cors = cors();
    this.baseURL = 'https://nextjs-express-nowv2.xanderbindt.now.sh/api/';
    //if(process.env.NODE_ENV !== 'production') {
      //this.baseURL = 'http://localhost:9999/api/';
    //}
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
// https://dev.to/doylecodes/cors-in-apollo-client-apollo-server-3cbj