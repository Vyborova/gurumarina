import { faker } from "@faker-js/faker";

export class ArticleBuilder {
  constructor() {
    this.title = "";
    this.description = "";
    this.body = "";
    this.tags = [];
  }

  withTitle(title) {
    this.title = title;
    return this;
  }

  withDescription(description) {
    this.description = description;
    return this;
  }

  withBody(body) {
    this.body = body;
    return this;
  }

  withTags(tags) {
    this.tags = tags;
    return this;
  }

  withRandomTitle() {
    this.title = faker.lorem.sentence();
    return this;
  }

  withRandomDescription() {
    this.description = faker.lorem.paragraph();
    return this;
  }

  withRandomBody() {
    this.body = faker.lorem.paragraphs(2);
    return this;
  }

  withRandomTags() {
    this.tags = [faker.lorem.word()];
    return this;
  }

  static random() {
    return new ArticleBuilder()
      .withRandomTitle()
      .withRandomDescription()
      .withRandomBody()
      .withRandomTags();
  }

  build() {
    return {
      title: this.title,
      description: this.description,
      body: this.body,
      tags: this.tags,
    };
  }
}
