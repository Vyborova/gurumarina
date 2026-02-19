import { test, expect } from "../src/fixture/ui.fixture.js";
import { ArticleBuilder } from "../src/builders/article.builder.js";
import { CommentBuilder } from "../src/builders/comment.builder.js";

test.describe("UI: статьи", () => {
  test("Пользователь может создать новую статью", async ({ authApp }) => {
    const article = ArticleBuilder.random().build();

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
    const article = ArticleBuilder.random().build();

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
    const article = ArticleBuilder.random().build();
    const comment = CommentBuilder.random().build();

    await authApp.createArticle(
      article.title,
      article.description,
      article.body,
      article.tags,
    );

    await authApp.addCommentToArticle(comment.body);
    await expect(authApp.commentByText(comment.body)).toBeVisible();
  });

  test("Пользователь может отредактировать статью", async ({ authApp }) => {
    const article = ArticleBuilder.random().build();

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
      .withRandomDescription()
      .withRandomBody()
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
    const article = ArticleBuilder.random().build();

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
      `${process.env.UI_BASE_URL || "https://realworld.qa.guru/#/"}/profile/Fusion/favorites`,
    );
    await authApp.gotoFavoritedArticles();

    await expect(authApp.page.getByText(article.title)).toBeVisible();
  });
});
