import { test as base } from "@playwright/test";
import { AirportFacade } from "../services/airport.facade.js";
import { DataGenerator } from "../helpers/data-generator.js";

export const test = base.extend({
  api: async ({ request, baseURL }, use) => {
    const user = DataGenerator.generateUser();
    const apiFacade = new AirportFacade(request, baseURL, user.email, user.password);
    await use(apiFacade);
  },
});

export const expect = test.expect;
