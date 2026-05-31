UNIT V: CI USING GITHUB ACTIONS
WEEK 12: AUTOMATING WORKFLOWS & EVENT TRIGGERS

Section A — WHAT IS WORKFLOW AUTOMATION?
GitHub Actions enables you to automate your complete software lifecycle — from building and testing to deploying — directly inside your GitHub repository.
CI (Continuous Integration) refers to the development practice where team members integrate their code changes into a shared repository multiple times daily. Each integration is validated by automated build and test processes.

Section B — WHERE TO PLACE WORKFLOW FILES
GitHub Actions requires workflow definitions written in YAML format.
These configuration files must reside inside a hidden folder at the repository root:
`.github/workflows/`
For instance, creating a file at `.github/workflows/ci.yml` will cause GitHub to automatically detect and run the workflow based on configured events.

Section C — CORE COMPONENTS OF GITHUB ACTIONS
- Runners: Servers responsible for executing your workflows. Each runner handles one job at a time.
- Workflows: Automated processes composed of one or more jobs, defined via YAML.
- Events/Triggers: Repository activities (such as pushes or pull requests) that initiate a workflow.
- Jobs: Collections of steps running on a single runner. By default, jobs execute concurrently.
- Steps: Individual operations inside a job — either shell scripts or reusable Actions.
- Actions: Reusable, standalone commands assembled into steps (e.g., `actions/checkout`).

Section D — TYPES OF WORKFLOW TRIGGERS
Workflows are driven by events. The most commonly used triggers are:
- `pull_request`: Fires when a PR is created, ensuring new code satisfies tests prior to merging.
- `push`: Fires when commits are pushed to designated branches (e.g., `branches: [ "main" ]`).
- `workflow_dispatch`: Adds a "Run workflow" button to the GitHub interface for on-demand execution. Custom input parameters can also be configured for manual runs.
- `schedule`: Leverages Cron expressions to execute workflows at predetermined intervals (e.g., nightly builds).

=======================================================
LAB EXERCISES — WEEK 12
=======================================================

### Lab Exercise 1: Setting Up a Basic Node.js CI Pipeline
**Scenario:**
Create a GitHub Actions YAML workflow called "Node CI Pipeline" that activates on pushes to the "main" branch. The pipeline should pull the source code, configure Node.js version 18, install project dependencies, and execute the test suite using `npm test`.

**Code:**
```yaml
name: Node CI Pipeline

on:
  push:
    branches: [ "main" ]

jobs:
  ci-pipeline:
    runs-on: ubuntu-latest
    steps:
      - name: Pull source code
        uses: actions/checkout@v3
        
      - name: Configure Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install project dependencies
        run: npm ci
        
      - name: Execute test suite
        run: npm test
```

### Lab Exercise 2: On-Demand Workflow Using Dispatch Trigger
**Scenario:**
Design a deployment workflow that team members can trigger manually. It should request an "environment" text input (with 'staging' as the default value) and then output "Deploying to [environment]".

**Code:**
```yaml
name: On-Demand Deploy

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment Target Environment'
        required: true
        default: 'staging'

jobs:
  run-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Deployment
        run: echo "Deploying application to the ${{ github.event.inputs.environment }} environment!"
```
*Note:* The `workflow_dispatch` event enables the manual trigger button in GitHub's interface. Input values are retrieved through the `github.event.inputs` context.
### Windows Lab — Actions Workflow
Copy the Java CI workflow YAML to your repository's `.github/workflows/` directory and push.

