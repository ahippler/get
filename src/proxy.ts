/* eslint-disable @typescript-eslint/no-var-requires */
import * as debug from 'debug';

const d = debug('@electron/get:proxy');

/**
 * Initializes a third-party proxy module for HTTP(S) requests.
 */
export function initializeProxy(): void {
  try {
    // Code originally from https://github.com/yeoman/yo/blob/b2eea87e/lib/cli.js#L19-L28
    const MAJOR_NODEJS_VERSION = parseInt(process.version.slice(1).split('.')[0], 10);

    if (MAJOR_NODEJS_VERSION >= 10) {
      // `global-agent` works with Node.js v10 and above.
      require('global-agent').bootstrap();
    } else {
      // `global-tunnel-ng` works with Node.js v10 and below.
      require('global-tunnel-ng').initialize();
    }
  } catch (e) {
    d('Could not load either proxy modules, built-in proxy support not available:', e);
  }
}
