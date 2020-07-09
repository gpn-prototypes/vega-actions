import * as core from '@actions/core';
import * as github from '@actions/github';
import { PullsGetResponseData } from '@octokit/types';

const { getOctokit, context } = github;

const getCurrentPr = async (): Promise<PullsGetResponseData> => {
  const repoToken = core.getInput('repo_token', { required: true });
  const client = getOctokit(repoToken);
  // eslint-disable-next-line @typescript-eslint/camelcase
  const currentPr = await client.pulls.get({ ...context.repo, pull_number: context.issue.number });
  return currentPr.data;
};

async function main(): Promise<void> {
  const necessaryLabel = core.getInput('necessary_label', { required: true });
  const currentPr = await getCurrentPr();
  const hasNecessaryLabel = currentPr.labels.some((label) => label.name === necessaryLabel);
  if (!hasNecessaryLabel) {
    core.setFailed(`Label "${necessaryLabel}" not found in this pr`);
  }
}

main();
