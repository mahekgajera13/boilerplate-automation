/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SHORT_PAUSE, ELEMENT_TIMEOUT, SHORT_TIMEOUT, WARNING_DISAPPEAR_TIME, MEDIUM_PAUSE } from './timeouts';
import Selectors from './selectors';
import { INavigateFromTitle, IFormActionElements } from '../types';
// import cheerio from 'cheerio';
import { Key } from 'webdriverio'
import { browser } from '@wdio/globals';

export async function element(locatorString: string) {
  try {
    const element = await $(locatorString);
    await element.waitForExist({ timeout: ELEMENT_TIMEOUT });
    return element as unknown as WebdriverIO.Element;
  } catch (e) {
    console.error('error with element with name: ', locatorString);
    throw e;
  }
}

export async function mayBeElement(locatorString: string, timeout = ELEMENT_TIMEOUT) {
  try {
    const element = await $(locatorString);
    await element.waitForDisplayed({ timeout: timeout }); // only for this method
    return element as unknown as WebdriverIO.Element;
  } catch (e) {
    return false as const;
  }
}

export function locatorParse(locatorString: string, parsing: string) {
  return locatorString.replaceAll(/{{\w+}}/ig, parsing);
}

export async function elementParse({ locatorString, parsing, options = {} }: { locatorString: string, parsing: string, options?: Record<string, unknown> }) {
  const _locatorString = locatorString.replace(/{{\w+}}/ig, parsing);
  const el = await $(_locatorString);
  if (await el.isExisting() || await el.waitForDisplayed({ timeout: ELEMENT_TIMEOUT })) {
    return el as unknown as WebdriverIO.Element;
  } return undefined;
}

export async function clickToElement(locatorString: string, timeout: number = ELEMENT_TIMEOUT, waitForClickable = true) {
  const el = await element(locatorString);

  if (waitForClickable) {
    await el.waitForClickable({ timeout: timeout });
  } else {
    await browser.pause(SHORT_PAUSE);
  }

  await el.click();
}

export async function slowInputFilling(locatorString: string, value: string) {
  /* eslint-disable no-constant-condition */

  const el = await element(locatorString);
  for (let i = 0; i < 8; i++) {
    await el.waitForEnabled();
    if (await el.isClickable()) {
      await el.click();
      await clearTextUsingBackspace(el);
    } else {
      try {
        await el.clearValue();
      } catch (error: any) {
        if (typeof error?.message === 'string' && error.message.includes("element not interactable")) {
          //Needed as sometimes elements are not interactable immediately
          await browser.pause(SHORT_PAUSE);
        } else {
          throw Error(String(error));
        }
      }
    }
    await el.setValue(value);
    await browser.pause(SHORT_PAUSE);
    const setValue = await el.getValue();
    if (setValue === value) {
      break;
    }

  }
}

export async function findAndSetValue(locator: string, value: string) {
  const el = await element(locator);
  await el.waitForEnabled();
  await clearTextUsingBackspace(el)
  await el.setValue(value);
}

export async function selectFromDropdown({ dropdownOpener, dropdownSelection }: { dropdownOpener: string, dropdownSelection: string }) {
  // the 1 second pause is due to js not being loaded on dropdowns when selected sometimes
  await clickToElement(dropdownOpener, SHORT_TIMEOUT);
  await browser.pause(SHORT_PAUSE);
  await clickToElement(dropdownSelection, MEDIUM_PAUSE);
  await browser.pause(SHORT_PAUSE);
}

export async function navigationFromTile(to: INavigateFromTitle) {
  const { title1, title2 } = to;
  const locationString = Selectors.common.navigationTile;
  const sanitizedLocator = locationString.replaceAll('{{title1}}', title1).replaceAll('{{title2}}', title2);
  await clickToElement(sanitizedLocator);
}

export async function formFill(formElements: IFormActionElements[]) {
  const setValue = async (element: WebdriverIO.Element, action: string, value: any) => {
    await element.waitForEnabled();
    switch (action) {
      case 'click':
        await element.click();
        break;
      case 'clearValue':
        await element.click(); // To select field for clearValue()
        await browser.keys(['\uE009', 'a', 'Back space']);
        await element.clearValue();
        await browser.pause(SHORT_PAUSE);
        break;
      case 'hitEnter':
        await browser.keys(`\uE007`);
        break;
      case 'doubleClick':
        await element.doubleClick();
        break;
      default:
        await element.clearValue();
        // @ts-expect-error dynamic element action
        await element[action](value);
        break;
    }
  };

  for (const { locator, action, value } of formElements) {
    try {
      const el = await element(locator);
      if (!el) { throw Error(`element can not located with path | location : ${locator}`); }
      await setValue(el, action, value);
    } catch (e) {
      console.error('error during fillForm: ', action, value, e);
      throw e;
    }
  }
}

export async function generateRandomAlphanumericString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function getElementBackgroundColor(locatorString: string) {

  const el = await (await element(locatorString)).getCSSProperty('background-color');
  const { hex } = el.parsed;
  return hex;

}

export async function elementArray(locatorString: string) {
  const els = await $$(locatorString);

  let allOkay = true;

  for (const el of els) {
    if (await el.isExisting() || await el.waitForDisplayed({ timeout: ELEMENT_TIMEOUT })) {
      continue;
    } else {
      console.error(`not all elements not found with locator ${locatorString} after waiting for ${ELEMENT_TIMEOUT}`);
      allOkay = false;
      break;
    }
  }

  if (!allOkay) {
    process.exit(0)
  }
  return els as unknown as WebdriverIO.ElementArray;
}

export async function elementDragAndDrop(source: string, destination: string) {
  const elSource = await element(source);
  const elDestination = await element(destination);
  await elSource.dragAndDrop(elDestination);
}

export async function elementParseAndClick(locatorString: string, parsing: string, waitForClickable = true) {
  const _locatorString = locatorString.replace(/{{\w+}}/ig, parsing);
  const el = await element(_locatorString);

  if (waitForClickable) {
    await el.waitForClickable({ timeout: ELEMENT_TIMEOUT });
  } else {
    await browser.pause(SHORT_PAUSE);
  }

  await el.click();
}

export async function reload() {
  const url = await browser.getUrl();
  await browser.url(url.toString());
  await expect(await browser.getUrl()).toEqual(url.toString());
}

export async function isElementSelected(element: WebdriverIO.Element) {
  if (await element.isSelected()) {
    return true;
  } else {
    return false;
  }
}

export async function doubleClickToElement(locatorString: string, waitForClickable = true) {
  const el = await element(locatorString);

  if (waitForClickable) {
    await el.waitForClickable({ timeout: ELEMENT_TIMEOUT });
  } else {
    await browser.pause(SHORT_PAUSE);
  }
  await el.doubleClick();
}

export async function clickToElementUsingJS(locatorString: string) {
  const el = await element(locatorString);
  await browser.pause(SHORT_PAUSE);
  await browser.execute("arguments[0].click();", el);
}

export async function hitEnter() {
  await browser.keys('\uE007')
}

export function getCurrencySymbol(currency: string) {
  switch (currency.trim().toLowerCase()) {
    case "euro":
      return `€`;
    default: throw Error("Currency:" + currency + " is not yet supported in func.ts.getCurrencySymbol().\nSupported Values:\n1.Euro`");
  }
}

export async function verifyElementIsNotDisplayed(locatorString: string, timeout = SHORT_TIMEOUT) {
  const element = await mayBeElement(locatorString, timeout);
  if (element === false || element === undefined) {
    await expect(false).toBeTruthy();
  }
}

export async function verifyElementIsDisplayed(locatorString: string, timeout = SHORT_TIMEOUT) {
  const element = await mayBeElement(locatorString, timeout);
  await expect(element).toBeTruthy();
}

export async function pressAndHoldShift() {
  await browser.performActions([
    {
      type: 'key',
      id: 'keyboard',
      actions: [
        { type: 'keyDown', value: Key.Shift },
      ],
    },
  ]);
}

export async function hitTab() {
  await browser.action('key').down(Key.Tab).perform();
}

export async function isElementDisplayed(locatorString: string, timeout = SHORT_TIMEOUT) {
  const element = await mayBeElement(locatorString, timeout);
  if (element === false || element === undefined) {
    return false;
  } else {
    return true;
  }
}

export async function getElementColor(locatorString: string) {

  const el = await (await element(locatorString)).getCSSProperty('color');
  const { hex } = el.parsed;
  return hex;

}

export async function clearTextUsingBackspace(element: WebdriverIO.Element) {
  let text = await element.getText();
  if (text.length === 0) {
    text = await element.getValue();
  }
  await element.click();
  await browser.pause(SHORT_PAUSE / 2);
  await browser.keys(['Control', 'a']);
  await browser.keys('Backspace');
  await browser.keys(['Control', 'NULL']);
}

export async function selectAllTextUsingCTRLPlusA() {
  await browser.keys([Key.Ctrl, 'a']);
}

export async function pasteAllText() {
  await browser.keys([Key.Ctrl,'v'])
}

export async function clickOnBackspaceKey() {
  await browser.keys(Key.Backspace);
}

export async function watiForElementToBeDisappear(locatorString: string, timeout = SHORT_TIMEOUT) {
  await (await $(locatorString)).waitForDisplayed({ timeout: timeout, reverse: true });
}

// export async function getTextFromAllChildElements(locatorString: string) {
//   const parentElement = await element(locatorString);
//   const html = await parentElement.getHTML();
//   const $ = cheerio.load(html);
//   return $.text();
// }

export async function elementGetText(locatorString: string) {
  const elementForFetchingText = await element(locatorString);
  return await elementForFetchingText.getText();
}

export async function dragAndDrop(source: string, destination: string) {
  const el1 = await element(source);
  const el2 = await element(destination);

  const el1Location = await el1.getLocation();
  const el2Location = await el2.getLocation();

  await browser.performActions([
    {
      type: 'pointer',
      id: 'pointer',
      parameters: { pointerType: 'touch' },
      actions: [
        { type: 'pointerMove', duration: 0, x: 0, y: 0, origin: el2 },
        { type: 'pointerDown', button: 0 },
        { type: 'pointerMove', duration: 0, x: 0, y: Math.floor((el2Location.y * 2) - el1Location.y), origin: el2 },
        { type: 'pointerMove', duration: 0, x: 0, y: 0, origin: el1 },
        { type: 'pointerUp', button: 0 },
      ],
    },
  ]);
}

export async function elementGetValue(locatorString: string) {
  const elementForFetchingValue = await element(locatorString);
  return await elementForFetchingValue.getValue();
}

export async function releaseShift() {
  await browser.performActions([
    {
      type: 'key',
      id: 'keyboard',
      actions: [
        { type: 'keyUp', value: Key.Shift },
      ],
    },
  ]);
}

export async function checkIfInputDisplayedAndResetInput(validatorSelector: string, inputSelector: string, inputValue: string) {
  let attempts = 0;
  let passed = false;

  try {
      await expect(await elementParse({ locatorString: validatorSelector, parsing: inputValue })).toBeDisplayed();
      passed = true;
  } catch (error) {
      console.error("Initial check failed:", error);
  }

  if (!passed) {
      while (attempts < 3) {
          try {
              await slowInputFilling(inputSelector, inputValue);
              // Check the condition again
              await expect(await elementParse({ locatorString: validatorSelector, parsing: inputValue })).toBeDisplayed();
              // If the condition passes, break out of the loop
              await clickToElement(Selectors.common.btnCreate);
              passed = true;
              break;
          } catch (error) {
              console.error("Attempt", attempts + 1, "failed:", error);
              attempts++;
          }
      }
  }

  if (!passed) {
      console.error("Condition failed after 3 attempts.");
      throw new Error(`Test scenario halted: Condition failed after 3 attempts to add input as ${inputValue} for create Project/Resource.`);
  }
}

export function getFormattedDate() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date();
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const dateFormat = `${month}_${day}_${year}`

  return dateFormat;
}

export const getFormattedDate2 = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};