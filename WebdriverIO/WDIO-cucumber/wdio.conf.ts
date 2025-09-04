const parseBrowsersFromEnv = (): Array<WebdriverIO.Capabilities> => {
    const envValue = process.env.BROWSERS || process.env.BROWSER || 'chrome'
    const browserList = envValue.split(',').map(b => b.trim().toLowerCase()).filter(Boolean)

    const toCapability = (name: string): WebdriverIO.Capabilities => {
        if (name === 'chrome' || name === 'chromium') {
            return { browserName: 'chrome' }
        }
        if (name === 'firefox' || name === 'ff') {
            return { browserName: 'firefox' }
        }
        if (name === 'edge' || name === 'msedge') {
            return { browserName: 'MicrosoftEdge' }
        }
        // Fallback to chrome if unknown
        return { browserName: 'chrome' }
    }

    return browserList.map(toCapability)
}

export const config: WebdriverIO.Config = {
   
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    
    specs: [
        './features/**/*.feature'
    ],
    exclude: [
    ],
    
    maxInstances: 10,
   
    capabilities: parseBrowsersFromEnv(),

    
    logLevel: 'info',
    
    bail: 0,
    
    waitforTimeout: 10000,
   
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    framework: 'cucumber',
    reporters: [
    ['spec', {
      symbols: {
        passed: '✓',
        failed: '✖',
      },
      addScreeshot: true
    }],
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      useCucumberStepReporter: true,
    }],
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/steps.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        name: [],
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
}
