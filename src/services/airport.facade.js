import { AirportService } from "./airport.service.js";
import { DataGenerator } from "../helpers/data-generator.js";

export class AirportFacade {
  constructor(request) {
    this.service = new AirportService(request);
    this.generator = DataGenerator;
  }

  async addRandomFavoriteAirport() {
    const { token } = await this.getAuthenticatedUser();
    const airportId = this.generator.generateAirportId();
    const note = this.generator.generateAirportNote();

    const result = await this.service.addToFavorites(token, airportId, note);

    if (result.errors && result.errors[0]?.status === "422") {
      return null;
    }

    return result;
  }

  async getAuthenticatedUser() {
    const token = process.env.API_TOKEN;
    const user = {
      email: process.env.API_EMAIL,
      password: process.env.API_PASSWORD,
    };
    return { user, token };
  }

  async getAirportById(airportId) {
    const { token } = await this.getAuthenticatedUser();
    return await this.service.getAirportById(token, airportId);
  }

  async getDistance(from, to) {
    const { token } = await this.getAuthenticatedUser();
    return await this.service.getDistance(token, from, to);
  }

  async getAllAirports() {
    const { token } = await this.getAuthenticatedUser();
    return await this.service.getAirports(token);
  }
  async getFavoriteById(favoriteId) {
    const { token } = await this.getAuthenticatedUser();
    return await this.service.getFavoriteById(token, favoriteId);
  }
}
