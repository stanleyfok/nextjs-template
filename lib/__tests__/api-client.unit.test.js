import ApiClient from '../api-client';

const apiClient = new ApiClient('.');

describe('Api Client', () => {
  describe('getShows(\'batman\')', () => {
    it('should response with data with status code 200', async () => {
      const data = await apiClient.getShows('batman');

      expect(data).toBeDefined();
      expect(data.data).toHaveLength(10);
      expect(data.statusCode).toBe(200);
    });
  });

  describe('getShows(\'helloworld\')', () => {
    it('should response without data with status code 200', async () => {
      const data = await apiClient.getShows('helloworld');

      expect(data).toBeDefined();
      expect(data.data).toHaveLength(0);
      expect(data.statusCode).toBe(200);
    });
  });
});
