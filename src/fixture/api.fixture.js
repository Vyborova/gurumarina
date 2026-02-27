import { test as base } from "@playwright/test";
import { AirportFacade } from "../services/airport.facade.js";

export const test = base.extend({
  api: async ({ request, baseURL }, use) => {
    const apiFacade = new AirportFacade(request, baseURL);
    await use(apiFacade);
  },
});

export const expect = test.expect;
