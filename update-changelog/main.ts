import * as fs from 'fs';
import * as path from 'path';

import * as core from '@actions/core';

const INSERTION_POINT = '<!-- insert-new-changelog-here -->';
const CHANGELOG_PATH = path.resolve(process.env.GITHUB_WORKSPACE, 'CHANGELOG.md');

async function main(): Promise<void> {
  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  if (!changelog.includes(INSERTION_POINT)) {
    throw new Error(`Missing "${INSERTION_POINT}" in CHANGELOG.md`);
  }
  let newChangelog = core.getInput('changelog', { required: true });
  newChangelog = JSON.parse(newChangelog);
  newChangelog = changelog.replace(INSERTION_POINT, `${INSERTION_POINT}\n${newChangelog}`);

  fs.writeFileSync(CHANGELOG_PATH, newChangelog);
}

main().catch((e) => {
  process.exitCode = 1;
  throw e;
});
