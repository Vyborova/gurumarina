import { faker } from "@faker-js/faker";

export class DataGenerator {
  static generateUser() {
    const user = {
      email: process.env.API_EMAIL,
      password: process.env.API_PASSWORD,
    };
    return user;
  }

  static generateAirportNote() {
    return faker.lorem.sentence();
  }

  static generateAirportId() {
    return faker.helpers.arrayElement(["KIX", "NRT", "JFK", "LAX", "LHR"]);
  }
}
