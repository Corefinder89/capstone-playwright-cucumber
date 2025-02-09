const { Given, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");

Given("I open the Playwright homepage", async function () {
  await this.page.goto("https://playwright.dev");
});

Then("the page title should contain {string}", async function (expectedTitle) {
  const title = await this.page.title();
  expect(title).to.include(expectedTitle);
});
