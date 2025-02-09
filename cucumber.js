module.exports = {
    default: {
      require: [
        "step_definitions/**/*.js",
        "support/**/*.js"
    ],
      format: ["html:reports/cucumber-report.html"],
      paths: ["features/**/*.feature"]
    }
  };
  