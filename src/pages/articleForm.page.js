export class ArticleFormPage {
  //техническое описание страницы
  constructor(page) {
    this.page = page;

    this.newArticleLink = page.getByRole("link", { name: "New Article" });
    this.titleInput = page.getByPlaceholder("Article Title");
    this.descriptionInput = page.getByPlaceholder("What's this article about?");
    this.bodyInput = page.getByPlaceholder("Write your article (in markdown)");
    this.tagsInput = page.getByPlaceholder("Enter tags");
    this.publishButton = page.getByRole("button", {
      name: /^(Publish|Update) Article$/i,
    });
  }

  //  бизнесовые действия со страницей

  async gotoNewArticle() {
    await this.newArticleLink.click();
  }

  async createArticle(title, description, body, tags = []) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);

    if (tags.length > 0) {
      await this.tagsInput.fill(tags[0]); // Просто первый тег
    }
  }

  async createAndPublishArticle(title, description, body, tags = []) {
    await this.createArticle(title, description, body, tags);
    await this.publishButton.click();
    await this.page.waitForLoadState("domcontentloaded");
  }
}
