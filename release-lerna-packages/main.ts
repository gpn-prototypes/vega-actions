const cp = require('child_process');

const exec = (command: string): string => cp.execSync(command).toString();

exec('git status');
