export class AirportService {
  constructor(request) {
    this.request = request;

    this.baseURL = process.env.API_BASE_URL || "https://airportgap.com/api";
  }

  async getAuthToken(email, password) {
    const response = await this.request.post(`${this.baseURL}/tokens`, {
      data: { email, password },
    });
    return response.json();
  }

  async getAirports(token) {
    const response = await this.request.get(`${this.baseURL}/airports`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }

  async getAirportById(token, airportId) {
    const response = await this.request.get(
      `${this.baseURL}/airports/${airportId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.json();
  }

  async getDistance(token, from, to) {
    const response = await this.request.post(
      `${this.baseURL}/airports/distance`,
      {
        headers: { Authorization: `Bearer ${token}` },
        data: { from, to },
      },
    );
    return response.json();
  }
  async addToFavorites(token, airportId, note) {
    const response = await this.request.post(`${this.baseURL}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { airport_id: airportId, note },
    });
    return response.json();
  }

  async getFavoriteById(token, favoriteId) {
    const response = await this.request.get(
      `${this.baseURL}/favorites/${favoriteId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.json();
  }
}
