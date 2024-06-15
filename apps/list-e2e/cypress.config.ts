import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, { cypressDir: 'src' }),
    baseUrl: 'http://localhost:4200',
  },
  viewportHeight: 960,
  viewportWidth: 1536,
  reporter: '../../node_modules/mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results/json',
    overwrite: false,
    html: false,
    json: true,
    suiteTitleSeparatedBy: ' > ',
    testCaseSwitchClassnameAndName: false,
    rootSuiteTitle: 'List E2E Tests',
    toConsole: true,
  },
  defaultCommandTimeout: 50000,
});
