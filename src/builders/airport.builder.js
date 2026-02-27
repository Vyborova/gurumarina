import { faker } from "@faker-js/faker";

export class AirportBuilder {
  constructor() {
    this.airportId = "";
    this.note = "";
  }

  withAirportId(airportId) {
    this.airportId = airportId;
    return this;
  }

  withNote(note) {
    this.note = note;
    return this;
  }

  static random() {
    return new AirportBuilder()
      .withAirportId(
        faker.helpers.arrayElement(["KIX", "NRT", "JFK", "LAX", "LHR"]),
      )
      .withNote(faker.lorem.sentence());
  }

  build() {
    return {
      airportId: this.airportId,
      note: this.note,
    };
  }
}
