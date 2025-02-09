const { BeforeAll, AfterAll, Before, After } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path")

const headlessMode = process.env.HEADLESS === "false" ? false : true;

// Global variables
let browser;
let context;
let page;

// Runs **before all** test scenarios
BeforeAll(async function () {
  console.log("Launching browser...");
  browser = await chromium.launch({ headless: headlessMode });
});

// Runs **before each** test scenario
Before(async function () {
  console.log("Creating new context and page...");
  context = await browser.newContext();
  page = await context.newPage();
  this.page = page; // Store page instance in Cucumber world
});

// Runs **after each** test scenario
// **Take Screenshot on Failure**
After(async function (scenario) {
  if (scenario.result?.status === "FAILED") {
    const screenshotPath = `screenshots/${scenario.pickle.name.replace(/ /g, "_")}.png`;
    
    // Ensure the screenshots folder exists
    if (!fs.existsSync("screenshots")) {
      fs.mkdirSync("screenshots");
    }

    // Take screenshot and save it
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot taken: ${screenshotPath}`);
  }

  await this.page.close();
  await context.close();
});

// Runs **after all** test scenarios
AfterAll(async function () {
  console.log("Closing browser...");
  await browser.close();
});

module.exports = { page };
