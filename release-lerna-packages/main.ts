const cp = require('child_process');
const core = require('@actions/core');

const exec = (command: string): string => cp.execSync(command).toString();

const DEFAULT_MAIN_BRANCH_NAME = 'master';
const DEFAULT_GITHUB_USERNAME = 'Github Workflow';
const DEFAULT_GITHUB_EMAIL = 'workflow@github.com';

const branch: string = core.getInput('branch', { required: true });

const getOptionalInput = (name: string, defaultValue: string): string => {
  return core.getInput(name) === '' ? defaultValue : core.getInput(name);
};

const githubUsername = getOptionalInput('gh_user', DEFAULT_GITHUB_USERNAME);
const githubEmail = getOptionalInput('gh_email', DEFAULT_GITHUB_EMAIL);
const mainBranch: string = getOptionalInput('main_branch', DEFAULT_MAIN_BRANCH_NAME);

const isMainBranch = branch.includes(mainBranch);

const gitConfig = (): void => {
  exec(`git config --local user.name "${githubUsername}"`);
  exec(`git config --local user.email "${githubEmail}"`);
};

const lernaVersion = (): void => {
  const baseLernaCommand = `yarn lerna version --conventional-commits --allow-branch=${branch} --no-commit-hooks --no-push --yes`;
  // const versionParam = `--conventional-${isMainBranch ? 'graduate' : 'prerelease'}`;

  exec(`${baseLernaCommand}`);
};

const lernaPublish = (): void => {
  exec('yarn lerna publish from-package --yes');
};

const gitPush = (): void => {
  exec(`git push origin ${branch} --follow-tags`);
};

gitConfig();
lernaVersion();
lernaPublish();
gitPush();
