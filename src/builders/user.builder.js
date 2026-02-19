import { faker } from "@faker-js/faker";

export class UserBuilder {
  constructor() {
    this.email = "";
    this.password = "";
    this.name = "";
    this.bio = "";
    this.image = "";
  }

  withEmail(email) {
    this.email = email;
    return this;
  }

  withPassword(password) {
    this.password = password;
    return this;
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withBio(bio) {
    this.bio = bio;
    return this;
  }

  withImage(image) {
    this.image = image;
    return this;
  }

  static random() {
    return new UserBuilder()
      .withEmail(faker.internet.email())
      .withPassword(faker.internet.password())
      .withName(faker.person.fullName())
      .withBio(faker.lorem.sentence())
      .withImage(faker.image.avatar());
  }

  static real() {
    return new UserBuilder()
      .withEmail(process.env.UI_EMAIL)
      .withPassword(process.env.UI_PASSWORD)
      .withName(process.env.UI_USERNAME);
  }

  build() {
    return {
      email: this.email,
      password: this.password,
      name: this.name,
      bio: this.bio,
      image: this.image,
    };
  }
}
