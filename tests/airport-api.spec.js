import { test, expect } from "../src/fixture/api.fixture.js";
import { DataGenerator } from "../src/helpers/data-generator.js";

test.describe("API: Airport Gap", () => {
  test("Получить токен авторизации", async ({ api }) => {
    const { token } = await api.getAuthenticatedUser();
    expect(token).toBe("kNwDUV8DK9SF1ZhGx9NjKSSx");
  });

  test("Получить список аэропортов", async ({ api }) => {
    const airports = await api.getAllAirports();

    expect(airports).toHaveProperty("data");
    expect(Array.isArray(airports.data)).toBe(true);
    expect(airports.data.length).toBeGreaterThan(0);
  });

  test("Получить аэропорт по ID", async ({ api }) => {
    const airportId = DataGenerator.generateAirportId();
    const airport = await api.getAirportById(airportId);

    expect(airport.data).toHaveProperty("attributes");
    expect(airport.data.attributes).toHaveProperty("icao");
    expect(airport.data.attributes).toHaveProperty("city");
  });

  test("Рассчитать расстояние между аэропортами", async ({ api }) => {
    const distance = await api.getDistance("KIX", "NRT");

    expect(distance.data).toHaveProperty("attributes");
    expect(distance.data.attributes).toHaveProperty("kilometers");
    expect(distance.data.attributes.kilometers).toBe(490.8053652969214);
  });

  test("Добавить аэропорт в избранное", async ({ api }) => {
    const favorite = await api.addRandomFavoriteAirport();

    expect(favorite).toHaveProperty("data");
    expect(favorite.data).toHaveProperty("attributes");
    expect(favorite.data.attributes).toHaveProperty("airport_id");
  });
});
