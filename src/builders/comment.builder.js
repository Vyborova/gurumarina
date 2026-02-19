import { faker } from "@faker-js/faker";

export class CommentBuilder {
  constructor() {
    this.body = "";
  }

  withBody(body) {
    this.body = body;
    return this;
  }

  withRandomBody() {
    this.body = faker.lorem.sentence();
    return this;
  }

  static random() {
    return new CommentBuilder().withRandomBody();
  }

  build() {
    return {
      body: this.body,
    };
  }
}
