import { AirportService } from "./airport.service.js";

export class AirportFacade {
  constructor(request, baseURL, email, password) {
    this.service = new AirportService(request, baseURL);
    this.email = email;
    this.password = password;
  }

  async addToFavorites(airportId, note) {
    const { token } = await this.getAuthenticatedUser();
    return await this.service.addToFavorites(token, airportId, note);
  }

  async getAuthenticatedUser() {
    const token = await this.service.getAuthToken(this.email, this.password);
    return { token };
  }

  async getAirportById(airportId) {
    return await this.service.getAirportById(airportId);
  }

  async getDistance(from, to) {
    return await this.service.getDistance(from, to);
  }

  async getAllAirports() {
    return await this.service.getAirports();
  }

  async clearFavorites() {
    const { token } = await this.getAuthenticatedUser();
    const favorites = await this.service.getFavorites(token);
    for (const item of favorites.data ?? []) {
      await this.service.deleteFavorite(token, item.id);
    }
  }
}
