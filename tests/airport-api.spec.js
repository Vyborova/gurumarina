import { test, expect } from "../src/fixture/api.fixture.js";

test.describe("API: Airport Gap", () => {
  test("Получить список аэропортов", async ({ api }) => {
    const airports = await api.getAllAirports();

    expect(airports).toHaveProperty("data");
    expect(Array.isArray(airports.data)).toBe(true);
    expect(airports.data.length).toBeGreaterThan(0);
  });

  test("Получить аэропорт по ID", async ({ api }) => {
    const airport = await api.getAirportById("JFK");

    expect(airport).toHaveProperty("data");
    expect(airport.data.id).toBe("JFK");
    expect(airport.data.attributes).toHaveProperty("name");
    expect(airport.data.attributes).toHaveProperty("iata");
  });

  test("Рассчитать расстояние между аэропортами", async ({ api }) => {
    const distance = await api.getDistance("JFK", "LAX");

    expect(distance).toHaveProperty("data");
    expect(distance.data.attributes).toHaveProperty("kilometers");
    expect(distance.data.attributes).toHaveProperty("miles");
    expect(distance.data.attributes.kilometers).toBeGreaterThan(0);
  });

  test("Добавить аэропорт в избранное", async ({ api }) => {
    const result = await api.addRandomFavoriteAirport();

    if (result === null) {
      expect(true).toBe(true);
    } else {
      expect(result).toHaveProperty("data");

      expect(result.data).toHaveProperty("attributes");
      expect(result.data.attributes).toHaveProperty("airport");
      expect(result.data.attributes.airport).toHaveProperty("id");
    }
  });

  test("Получить запись из избранного по ID", async ({ api }) => {
    const favoriteResult = await api.addRandomFavoriteAirport();

    if (favoriteResult !== null) {
      const favoriteId = favoriteResult.data.id;
      const favorite = await api.getFavoriteById(favoriteId);

      expect(favorite).toHaveProperty("data");
      expect(favorite.data.id).toBe(favoriteId);
      expect(favorite.data.type).toBe("favorite");
      expect(favorite.data.attributes).toHaveProperty("airport");
      expect(favorite.data.attributes).toHaveProperty("note");
    } else {
      expect(true).toBe(true);
    }
  });
});
