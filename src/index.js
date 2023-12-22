const core = require('@actions/core')
const github = require('@actions/github')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const token = core.getInput('token');
    const title = core.getInput('title');
    const body = core.getInput('body');
    const assignees = core.getInput('assignees');

    const octokit = github.getOctokit(token);

    const response = await octokit.request.issues.create({
      // owner: github.context.repo.owner,
      // repo: github.context.repo.repo,
      ...github.context.repo,
      title,
      body,
      assignees: assignees ? assignees.split('\n') : undefined
    });

    core.setOutput("issue", response.data);
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

run();
