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

getCurrentPr().then((currentPr) => {
  const { labels } = currentPr;

  console.log(labels);
});
