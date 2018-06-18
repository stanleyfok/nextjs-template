import fetch from 'isomorphic-unfetch';
import config from 'configs/config';

export default class ApiClient {
  async doFetch(path) {
    const url = config.api.baseURL + path;

    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: res.status,
      data,
    };
  }

  async getShows(keyword) {
    const res = await this.doFetch(`/search/shows?q=${keyword}`);

    return res;
  }

  async getShow(id) {
    const res = await this.doFetch(`/shows/${id}`);

    return res;
  }
}
