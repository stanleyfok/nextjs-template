import axios from 'axios';
import config from 'configs/config';

export default class ApiClient {
  constructor() {
    this.defaultOptions = {
      baseURL: config.api.baseURL,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  handleRequest(options) {
    return axios.request(Object.assign(this.defaultOptions, options));
  }

  handleError(error) {
    // you can customize the error handler here based on your api error response
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    }

    throw new Error('Unknown Error');
  }

  async getShows(keyword) {
    return this.handleRequest({
      method: 'get',
      url: `/search/shows?q=${keyword}`,
    })
      .then(res => res.data)
      .catch(this.handleError);
  }

  async getShow(id) {
    return this.handleRequest({
      method: 'get',
      url: `/shows/${id}`,
    })
      .then(res => res.data)
      .catch(this.handleError);
  }
}
