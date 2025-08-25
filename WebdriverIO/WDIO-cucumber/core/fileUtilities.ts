import * as path from 'path';
import { SHORT_TIMEOUT } from './timeouts';
import * as fs from 'fs';
import { browser } from '@wdio/globals';

async function waitForFileToDownload(filePath: string, expectedFileName: string) {
  // Wait for the download to complete (you may need to implement a custom wait)
  await browser.waitUntil(() => {
    return fs.existsSync(filePath);
  }, {
    timeout: SHORT_TIMEOUT*2, // Adjust the timeout as needed
    timeoutMsg: `File '${expectedFileName}' was not downloaded within the specified time.`,
  });
}

export {
  waitForFileToDownload,
};