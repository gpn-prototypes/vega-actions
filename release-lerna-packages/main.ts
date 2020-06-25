const cp = require('child_process');

const exec = (command: string): string => cp.execSync(command).toString();

// eslint-disable-next-line no-console
console.log(exec('git status'));
