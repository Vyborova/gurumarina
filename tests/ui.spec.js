import { test, expect } from "../src/fixture/ui.fixture.js";
import { faker } from "@faker-js/faker";
import { ArticleBuilder } from "../src/builders/article.builder.js";

test.describe("UI: статьи", () => {
  test("Пользователь может создать новую статью", async ({ authApp }) => {
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    await authApp.createArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await expect(authApp.page.getByText(article.title)).toBeVisible();
    await authApp.addCommentToArticle("Test comment");
    await expect(authApp.commentByText("Test comment")).toBeVisible();
  });

  test("Проверяем отображение созданной статьи в Global Feed", async ({
    authApp,
  }) => {
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    await authApp.createArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await authApp.openMainPage();
    await authApp.openGlobalFeed();

    await expect(authApp.page.getByText(article.title)).toBeVisible();
    await expect(authApp.authorLink("Fusion")).toBeVisible();
  });

  test("Пользователь может добавить комментарий к статье", async ({
    authApp,
  }) => {
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    const comment = faker.lorem.sentence();

    await authApp.createArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await authApp.addCommentToArticle(comment);
    await expect(authApp.commentByText(comment)).toBeVisible();
  });

  test("Пользователь может отредактировать статью", async ({ authApp }) => {
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    await authApp.createArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await expect(authApp.page.getByText(article.title)).toBeVisible();

    await authApp.editArticle();

    const updatedArticle = new ArticleBuilder()
      .withTitle(article.title)
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags(article.tags)
      .build();

    await authApp.createArticle(
      updatedArticle.title,
      updatedArticle.description,
      updatedArticle.body,
      updatedArticle.tags,
    );

    await expect(authApp.page.getByText(updatedArticle.body)).toBeVisible();
  });

  test("Пользователь может добавить статью в Favorited Articles", async ({
    authApp,
  }) => {
    const article = new ArticleBuilder()
      .withTitle(faker.lorem.sentence())
      .withDescription(faker.lorem.paragraph())
      .withBody(faker.lorem.paragraphs(2))
      .withTags([faker.lorem.word()])
      .build();

    await authApp.createArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await expect(authApp.favoriteButton).toBeVisible({
      timeout: 10000,
    });
    await authApp.favoriteArticle();

    await authApp.page.goto(
      `https://realworld.qa.guru/#/profile/Fusion/favorites`,
    );
    await authApp.gotoFavoritedArticles();

    await expect(authApp.page.getByText(article.title)).toBeVisible();
  });
});
