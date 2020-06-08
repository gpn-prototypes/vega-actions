const core = require("@actions/core");
const github = require("@actions/github");

const token = core.getInput("token", { required: true });
const tag = core.getInput("tag", { required: true });
const changelog = core.getInput("changelog", { required: true });
const [ repoOwner, repoName ] = process.env.GITHUB_REPOSITORY.split("/");

const octokit = github.getOctokit(token);

console.log(tag)
console.log(changelog)

octokit.repos.createRelease({
  owner: repoOwner,
  repo: repoName,
  tag_name: tag,
  body: JSON.parse(changelog),
  draft: true,
});