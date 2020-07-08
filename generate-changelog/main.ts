import * as cp from 'child_process';
import * as path from 'path';

import * as core from '@actions/core';

const changelogPath = path.resolve('node_modules/@gpn-prototypes/vega-changelog/bin/cli.js');

const exec = (cmd: string): string => cp.execSync(cmd).toString();

const changelog = exec(`node ${changelogPath}`);

core.setOutput('changelog', JSON.stringify(changelog));
