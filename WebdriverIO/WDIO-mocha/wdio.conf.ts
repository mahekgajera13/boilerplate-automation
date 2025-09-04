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
        return { browserName: 'chrome' }
    }

    return browserList.map(toCapability)
}

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
   
    specs: [
        './test/specs/**/*.ts'
    ],
    
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
  
    capabilities: parseBrowsersFromEnv(),

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
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
    }],
  ],
}
