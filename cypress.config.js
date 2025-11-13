const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  },
  // Video recording configuration
  video: true,
  videoCompression: 32,
  videosFolder: 'cypress/videos',
  // Screenshot configuration
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots'
});
