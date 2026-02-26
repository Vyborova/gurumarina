export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.favoritedArticlesLink = page.getByRole("link", {
      name: "Favorited Articles",
    });
  }

  async gotoFavoritedArticles() {
    await this.favoritedArticlesLink.click();
    await this.page.waitForURL("**/#/profile/**/favorites");
  }
}
