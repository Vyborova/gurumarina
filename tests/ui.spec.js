import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { MainPage } from "../src/pages/main.page";
import { ArticleFormPage } from "../src/pages/articleForm.page";
import { ArticleViewPage } from "../src/pages/articleView.page";
import { ProfilePage } from "../src/pages/profile.page";

test.describe("UI: статьи", () => {
  const url = "https://realworld.qa.guru/#/";

  const user = {
    email: "test-20251@mail.ru",
    password: "Vybor2025",
    name: "Fusion",
  };

  test.beforeEach(async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.open(url);
    await mainPage.login(user.email, user.password);
  });

  test("Пользователь может создать новую статью", async ({ page }) => {
    const articleFormPage = new ArticleFormPage(page);
    const articleViewPage = new ArticleViewPage(page);

    const article = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      body: faker.lorem.paragraphs(2),
      tags: [faker.lorem.word()],
    };

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await expect(page.getByText(article.title)).toBeVisible();

    await articleViewPage.addComment("Test comment");
    await expect(articleViewPage.commentByText("Test comment")).toBeVisible();
  });
  test("Проверяем отображение созданной статьи в Global Feed", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);
    const articleFormPage = new ArticleFormPage(page);

    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const body = faker.lorem.paragraphs(2);
    const tags = [faker.lorem.word()];

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      title,
      description,
      body,
      tags,
    );

    await mainPage.openMainPage();
    await mainPage.openGlobalFeed();

    await expect(page.getByText(title)).toBeVisible();
    await expect(
      page.locator('a.author:has-text("Fusion")').first(),
    ).toBeVisible();
  });

  test("Пользователь может добавить комментарий к статье", async ({ page }) => {
    const articleFormPage = new ArticleFormPage(page);
    const articleViewPage = new ArticleViewPage(page);

    const article = {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      body: faker.lorem.paragraphs(2),
      tags: [faker.lorem.word()],
    };

    const comment = faker.lorem.sentence();

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await articleViewPage.addComment(comment);
    await expect(articleViewPage.commentByText(comment)).toBeVisible();
  });

  test("Пользователь может отредактировать статью", async ({ page }) => {
    const articleFormPage = new ArticleFormPage(page);
    const articleViewPage = new ArticleViewPage(page);

    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const body = faker.lorem.paragraphs(2);
    const tags = [faker.lorem.word()];

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      title,
      description,
      body,
      tags,
    );

    await expect(page.getByText(title)).toBeVisible();

    await articleViewPage.gotoEditArticle();

    const updatedDescription = faker.lorem.paragraph();
    const updatedBody = faker.lorem.paragraphs(2);

    await articleFormPage.createAndPublishArticle(
      title,
      updatedDescription,
      updatedBody,
      tags,
    );

    await expect(page.getByText(updatedBody)).toBeVisible();
  });

  test("Пользователь может добавить статью в Favorited Articles", async ({
    page,
  }) => {
    const articleFormPage = new ArticleFormPage(page);
    const articleViewPage = new ArticleViewPage(page);
    const profilePage = new ProfilePage(page);

    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const body = faker.lorem.paragraphs(2);
    const tags = [faker.lorem.word()];

    await articleFormPage.gotoNewArticle();
    await articleFormPage.createAndPublishArticle(
      title,
      description,
      body,
      tags,
    );

    await articleViewPage.favoriteArticle();

    await page.goto("https://realworld.qa.guru/#/profile/Fusion/favorites");
    await profilePage.gotoFavoritedArticles();

    await expect(page.getByText(title)).toBeVisible();
  });
});
