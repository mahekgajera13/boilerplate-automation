import { assert } from 'chai';
import allure, { type Status } from '@wdio/allure-reporter'
import { browser } from '@wdio/globals';

class SoftAssert {
  private assertionErrorMessages: string[] = [];

  async equal(actual: any, expected: any, message: string, deepStrictEqual = false) {
    try {
      if (deepStrictEqual) {
        assert.deepStrictEqual(actual, expected, message);
      } else {
        assert.equal(actual, expected, message);
      }
      const PASSED: Status = 'passed';
      allure.addStep(`Verify if Actual value:[${actual}] is equal to Expected value:[${expected}]`, PASSED);
    } catch (error: any) {
      const screenshot = await browser.takeScreenshot();
      const pageSource = await browser.getPageSource();
      const FAILED: Status = 'failed';
      allure.addStep(`Verify if Actual value:[${actual}] is equal to Expected value:[${expected}]`, FAILED);
      allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
      allure.addAttachment('Page Source', pageSource, 'text/html');
      this.assertionErrorMessages.push(`${message} expected:[${expected}] actual:[${actual}]`);
    }
  }

  async isTrue(actual: boolean, message: string) {
    try {
      assert.isTrue(actual, message);
      allure.addStep(`Verify if value:[${actual}] is true`, 'passed');
    } catch (error: any) {
      const screenshot = await browser.takeScreenshot();
      const pageSource = await browser.getPageSource();
      const FAILED: Status = 'failed';
      allure.addStep(`Verify if the Actual value:[${actual}] is true`, FAILED);
      allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
      allure.addAttachment('Page Source', pageSource, 'text/html');
      this.assertionErrorMessages.push(`${message} expected:[true] actual:[${actual}]`);
    }
  }

  async isFalse(actual: boolean, message: string) {
    try {
      assert.isFalse(actual, message);
      allure.addStep(`Verify if value:[${actual}] is false`, 'passed');
    } catch (error: any) {
      const screenshot = await browser.takeScreenshot();
      const pageSource = await browser.getPageSource();
      const FAILED: Status = 'failed';
      allure.addStep(`Verify if the Actual value:[${actual}] is false`, FAILED);
      allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
      allure.addAttachment('Page Source', pageSource, 'text/html');
      this.assertionErrorMessages.push(`${message} expected:[false] actual:[${actual}]`);
    }
  }

  async notEqual(actual: any, expected: any, message: string, deepStrictEqual = false) {
    try {
      assert.notEqual(actual, expected, message);
      const PASSED: Status = 'passed';
      allure.addStep(`Verify if Actual value:[${actual}] is NOT equal to Expected value:[${expected}]`, PASSED);
    } catch (error: any) {
      const screenshot = await browser.takeScreenshot();
      const pageSource = await browser.getPageSource();
      const FAILED: Status = 'failed';
      allure.addStep(`Verify if Actual value:[${actual}] is NOT equal to Expected value:[${expected}]`, FAILED);
      allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
      allure.addAttachment('Page Source', pageSource, 'text/html');
      this.assertionErrorMessages.push(`${message} expected:[${expected}] actual:[${actual}]`);
    }
  }

  async isGreaterThan(actual: any, expected: any, message: string,) {
    try {
      assert.isAbove(actual,expected, message);
      const PASSED: Status = 'passed';
      allure.addStep(`Verify if value:[${actual}] is greater than:[${expected}]`, PASSED);
    } catch (error: any) {
      const screenshot = await browser.takeScreenshot();
      const pageSource = await browser.getPageSource();
      const FAILED: Status = 'failed';
      allure.addStep(`Verify if the Actual value:[${actual}] is greater than:[${expected}]`, FAILED);
      allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
      allure.addAttachment('Page Source', pageSource, 'text/html');
      this.assertionErrorMessages.push(`${message} expected:[>${expected}] actual:[${actual}]`);
    }
  }

  async isLessThan(actual: any, expected: any, message: string,) {
    try {
      assert.isBelow(actual,expected, message);
      const PASSED: Status = 'passed';
      allure.addStep(`Verify if value:[${actual}] is less than:[${expected}]`, PASSED);
    } catch (error: any) {
      const screenshot = await browser.takeScreenshot();
      const pageSource = await browser.getPageSource();
      const FAILED: Status = 'failed';
      allure.addStep(`Verify if the Actual value:[${actual}] is less than:[${expected}]`, FAILED);
      allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
      allure.addAttachment('Page Source', pageSource, 'text/html');
      this.assertionErrorMessages.push(`${message} expected:[<${expected}] actual:[${actual}]`);
    }
  }

  assertAll() {
    let finalMessage = '';
    if (this.assertionErrorMessages.length === 0) {
      return;
    }
    for (let i = 0; i < this.assertionErrorMessages.length; i++) {
      if (i === 0) {
        finalMessage += `Following assertion(s) failed. Click here to see the details...\n\n`;
        finalMessage += `${(i + 1)}. ${this.assertionErrorMessages[i]}\n\n`;
      } else {
        finalMessage += `${(i + 1)}. ${this.assertionErrorMessages[i]}\n\n`;
      }
    }
    assert.isTrue(false, finalMessage);
  }

}

export default SoftAssert;