import { test as base } from "@playwright/test";
import { AppFacade } from "../pages/app.facade.js";
import { UserBuilder } from "../builders/user.builder.js";

export const test = base.extend({
  app: async ({ page }, use) => {
    const app = new AppFacade(page);
    await use(app);
  },

  authApp: async ({ page }, use) => {
    const app = new AppFacade(page);
    const user = UserBuilder.real().build();

    await app.open();
    await app.login(user);

    await use(app);
  },
});

export const expect = test.expect;
