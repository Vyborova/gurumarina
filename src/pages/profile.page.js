export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.favoritedArticlesLink = page.locator(
      'a.nav-link:has-text("Favorited Articles")',
    );
  }

  async gotoFavoritedArticles() {
    await this.favoritedArticlesLink.click();
    await this.page.waitForURL("**/#/profile/**/favorites");
  }
}
