export class HomePage {
  //техническое описание страницы
  constructor(page) {
    this.page = page;

    this.profileName = page.locator(".dropdown-toggle");
  }
  //  бизнесовые действия со страницей
  async getProfileName() {
    const text = await this.getProfileName.textContent();
    return text;
  }
}
