exports.config = {
  tests: './tests/test_*.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'http://apollo.rax.io',
      host: '127.0.0.1',
      port: 4444,
      browser: 'chrome',
      waitForTimeout: 20000,
      smartWait: 8000,
      timeouts: {
        'page Load': 30000
      },
      desiredCapabilities: {
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
          args: [
            '--disable-gpu',
            '--no-sandbox',
            '--start-maximized',
            '--window-size=1341,810'
          ]
        }
      }
    },
    ChaiWrapper: {
      require: 'codeceptjs-chai'
    }
  },
  include: {
    I: './steps_file.js',
    customerInfo: './fragments/customerInfo.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'acceptance',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    wdio: {
      enabled: true,
      services: ['selenium-standalone']
    }
  }
};
