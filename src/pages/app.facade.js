import { MainPage } from "./main.page.js";
import { ArticleFormPage } from "./articleForm.page.js";
import { ArticleViewPage } from "./articleView.page.js";
import { ProfilePage } from "./profile.page.js";
import { UserBuilder } from "../builders/user.builder.js";

export class AppFacade {
  constructor(page) {
    this.page = page;

    this.mainPage = new MainPage(page);
    this.articleFormPage = new ArticleFormPage(page);
    this.articleViewPage = new ArticleViewPage(page);
    this.profilePage = new ProfilePage(page);
  }

  async open(url = "/") {
    await this.mainPage.open(url);
  }

  async login(user) {
    await this.mainPage.login(user.email, user.password);
  }

  async loginWithRealUser() {
    const user = UserBuilder.real().build();
    await this.login(user);
    return user;
  }

  async createArticle(title, description, body, tags = []) {
    await this.articleFormPage.gotoNewArticle();
    await this.articleFormPage.createAndPublishArticle(
      title,
      description,
      body,
      tags,
    );
  }

  async addCommentToArticle(comment) {
    await this.articleViewPage.addComment(comment);
  }

  async favoriteArticle() {
    await this.articleViewPage.favoriteArticle();
  }

  async editArticle() {
    await this.articleViewPage.gotoEditArticle();
  }

  async openMainPage() {
    await this.mainPage.openMainPage();
  }

  async openGlobalFeed() {
    await this.mainPage.openGlobalFeed();
  }

  async gotoFavoritedArticles() {
    await this.profilePage.gotoFavoritedArticles();
  }

  get authorLink() {
    return this.mainPage.authorLink;
  }

  get favoriteButton() {
    return this.articleViewPage.favoriteButton;
  }

  get commentByText() {
    return this.articleViewPage.commentByText.bind(this.articleViewPage);
  }
}
