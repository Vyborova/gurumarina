import { faker } from "@faker-js/faker";

export class DataGenerator {
  static generateUser() {
    return {
      email: process.env.API_EMAIL,
      password: process.env.API_PASSWORD,
    };
  }

  static generateAirportNote() {
    return faker.lorem.sentence();
  }

  static generateAirportId() {
    return faker.helpers.arrayElement(["KIX", "NRT", "JFK", "LAX", "LHR"]);
  }
}
