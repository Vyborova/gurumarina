import { test as base } from "@playwright/test";
import { AirportFacade } from "../services/airport.facade.js";

export const test = base.extend({
  api: async ({ request }, use) => {
    const apiFacade = new AirportFacade(request);
    await use(apiFacade);
  },
});

export const expect = test.expect;
