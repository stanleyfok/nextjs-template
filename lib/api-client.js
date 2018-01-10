import fetch from 'isomorphic-unfetch';

export default class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || '.';
  }

  async doFetch(path) {
    const url = this.baseUrl + path;

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
