import { AppPage } from "./app.po";

describe("openweather-angular App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  test("should display welcome message", () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual("Welcome to app!");
  });
});
