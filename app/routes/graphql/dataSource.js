import { RESTDataSource } from 'apollo-datasource-rest';

export class MvrpAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:9999/api/';
  }

  async getAllStations() {
    return this.get('stations');
  }

};