export class HomePage {
  //техническое описание страницы
  constructor(page) {
    this.page = page;
    // todo нейминг и селектор не очень хороши
    this.profileName = page.locator(".dropdown-toggle");
    //this.signupLink = page.getByRole("link", { name: "Sign up" }).describe("Кнопка/ссылка зарегистрироваться");
  }
  //  бизнесовые действия со страницей

  async getProfileName() {
    const text = await this.getProfileName.textContent();
    return text;
  }
}
