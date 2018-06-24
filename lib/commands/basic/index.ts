'use strict';

import chalk from 'chalk';
const dashdash = require('dashdash');
import options from "./cmd-line-opts";
import {NPMLinkUpOpts} from "../../npmlinkup";
import log from '../../logging';
import npmLinkUpPkg = require('../../../package.json');

let opts: any, parser = dashdash.createParser({options});

try {
  opts = parser.parse(process.argv);
} catch (e) {
  log.error(' => CLI parsing error:', e.message);
  process.exit(1);
}

if (opts.version) {
  console.log(npmLinkUpPkg.version);
  process.exit(0);
}

if (opts.help) {
  let help = parser.help({includeEnv: true}).trimRight();
  console.log('usage: nlu [OPTIONS]\n' + 'options:\n' + help);
  process.exit(0);
}

if (opts.bash_completion) {

  let generatedBashCode = dashdash.bashCompletionFromOptions({
    name: 'npmlinkup',
    options: options,
    includeHidden: true
  });

  console.log(generatedBashCode);

  process.exit(0);
}


log.warn('Original command:', process.argv);
log.warn('No option was recognized, exiting with 1.');
process.exit(1);
