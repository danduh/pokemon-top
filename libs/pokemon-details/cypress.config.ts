import { nxComponentTestingPreset } from '@nx/react/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
  component: nxComponentTestingPreset(__filename),
  video: true,
  viewportHeight: 768,
  viewportWidth: 1024,
  reporter: '../../node_modules/mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results/json',
    overwrite: false,
    html: false,
    json: true,
    suiteTitleSeparatedBy: ' > ',
    testCaseSwitchClassnameAndName: false,
    rootSuiteTitle: 'Details Component Tests',
    toConsole: true,
  },
});
