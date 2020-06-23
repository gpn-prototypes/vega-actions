import * as cp from 'child_process';

import * as core from '@actions/core';
import * as github from '@actions/github';

const exec = (cmd: string): string => cp.execSync(cmd).toString();

const token = core.getInput('token', { required: true });
const mainPackage = core.getInput('main_package');
const changelog = core.getInput('changelog', { required: true });

const getRepo = (): string[] => {
  if (process.env.GITHUB_REPOSITORY) {
    return process.env.GITHUB_REPOSITORY.split('/');
  }

  return ['', ''];
};

const [repoOwner, repoName] = getRepo();

const octokit = github.getOctokit(token);

const getPackages = (): string[] => {
  const command = "git for-each-ref --sort=creatordate --format '%(tag)'";
  const packages = mainPackage ? exec(`${command} | grep "${mainPackage}"`) : exec(command);
  return packages.split('\n').filter((tag) => tag.length > 0);
};

const packages = getPackages();

const tag = packages[packages.length - 1];

octokit.repos.createRelease({
  owner: repoOwner,
  repo: repoName,
  // eslint-disable-next-line @typescript-eslint/camelcase
  tag_name: tag,
  name: tag,
  body: JSON.parse(changelog),
});
