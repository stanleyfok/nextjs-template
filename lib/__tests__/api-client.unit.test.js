import ApiClient from '../api-client';

const apiClient = new ApiClient('.');

describe('Api Client', () => {
  describe('getShows(keyword)', () => {
    describe('keyword: \'batman\'', () => {
      it('should response with data with status code 200', async () => {
        const res = await apiClient.getShows('batman');

        expect(res).toBeDefined();
        expect(res.data).toHaveLength(10);
        expect(res.statusCode).toBe(200);
      });
    });

    describe('keyword: \'hellowolrd\'', () => {
      it('should response without data with status code 200', async () => {
        const res = await apiClient.getShows('helloworld');

        expect(res).toBeDefined();
        expect(res.data).toHaveLength(0);
        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe('getShow(id)', () => {
    describe('id: \'975\'', () => {
      it('should response with data with status code 200', async () => {
        const res = await apiClient.getShow('975');

        expect(res).toBeDefined();
        expect(res.statusCode).toBe(200);
        expect(res.data.id).toBe(975);
      });
    });

    describe('id: \'123456789\'', () => {
      it('should response without data with status code 404', async () => {
        const res = await apiClient.getShow('123456789');

        expect(res).toBeDefined();
        expect(res.statusCode).toBe(404);
      });
    });
  });
});
