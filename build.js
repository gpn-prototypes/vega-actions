const cp = require('child_process');
const fs = require('fs');

const exec = (command) => cp.execSync(command).toString();

const ignoreDirs = ['.git', 'node_modules', '.github'];

const isDirectory = (source) => fs.lstatSync(source).isDirectory();
const getDirectories = (source) =>
  fs.readdirSync(source).filter((dir) => isDirectory(dir) && !ignoreDirs.includes(dir));

const dirList = getDirectories(__dirname);

dirList.forEach((dir) => {
  exec(`yarn ncc build ${dir}/main.ts -o ${dir}/dist`);
});
