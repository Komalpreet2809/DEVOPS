UNIT V: CI USING GITHUB ACTIONS
WEEK 14: EXECUTION RUNNERS, DOCKER BUILDS & CLOUD DEPLOYMENT

Section A — GITHUB-HOSTED VS SELF-HOSTED RUNNERS
- GitHub-Hosted Runners: Virtual machines fully managed by GitHub. A fresh VM is provisioned for each job and destroyed afterward. These runners come with Docker, Node, Python, and other tools pre-installed. They are very convenient but subject to usage limits on private repos.
- Self-Hosted Runners: You install the GitHub Actions runner agent on your own machines (e.g., AWS EC2 instances, Raspberry Pi devices, or on-premise servers). This gives you full hardware control and no time limits, but you must handle OS patching, security hardening, and workspace cleanup between job runs.

Section B — SECURITY CONSIDERATIONS FOR SELF-HOSTED RUNNERS
Self-Hosted runners should NEVER be used on public repositories that accept Pull Requests from external contributors. A malicious PR could run arbitrary commands on your internal infrastructure.

Section C — DOCKER INTEGRATION WITH GITHUB ACTIONS
One of the most prevalent CI/CD use cases is building and publishing Docker containers.
GitHub-hosted runners (using `ubuntu-latest`) have Docker available natively without additional setup.

Section D — PUBLISHING IMAGES TO DOCKER HUB
Official marketplace actions like `docker/build-push-action` simplify secure image builds. Sensitive credentials such as passwords and tokens must NEVER appear in workflow files. Instead, store them in "GitHub Repository Secrets" and reference them using `${{ secrets.SECRET_NAME }}`.

Section E — GITHUB CONTAINER REGISTRY (GHCR)
GitHub offers its own container registry tightly coupled with GitHub Actions. Every workflow run receives an automatic `${{ secrets.GITHUB_TOKEN }}` that can authenticate and push images to GHCR — no external Docker Hub credentials needed.

Section F — DEPLOYING TO REMOTE SERVERS AND CLOUD PLATFORMS
After artifacts or images are produced, Actions can orchestrate deployments:
- Cloud CLI Tools: Runners include AWS CLI, Azure CLI, and Google Cloud SDK for triggering serverless deployments or Kubernetes rollouts.
- SSH Actions: Connect to a remote Linux host over SSH to execute commands like `git pull && docker-compose up`.

=======================================================
LAB EXERCISES — WEEK 14
=======================================================

### Lab Exercise 5: Build and Publish a Docker Image to Docker Hub
**Scenario:**
Create a workflow job that pulls the source code, authenticates with Docker Hub using secrets `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`, builds the Dockerfile, and pushes the image as `devuser/webapp:latest`.

**Code:**
```yaml
jobs:
  publish-image:
    runs-on: ubuntu-latest
    steps:
      - name: Pull source code
        uses: actions/checkout@v3

      - name: Authenticate with Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and publish Docker image
        uses: docker/build-push-action@v3
        with:
          context: .
          push: true
          tags: devuser/webapp:latest
```

### Lab Exercise 6: Remote Server Deployment via SSH
**Scenario:**
Once your container image is published, you need the production server to fetch the latest image and restart services. Write a step using `appleboy/ssh-action` to connect to your server and run a restart sequence.

**Code:**
```yaml
steps:
  - name: Run remote deployment commands via SSH
    uses: appleboy/ssh-action@master
    with:
      host: ${{ secrets.DEPLOY_HOST }}
      username: ${{ secrets.DEPLOY_USER }}
      key: ${{ secrets.DEPLOY_SSH_KEY }}
      script: |
        cd /opt/webapp
        docker pull devuser/webapp:latest
        docker-compose down
        docker-compose up -d
```
*Note:* This step uses an SSH private key stored in GitHub Secrets to securely connect to the remote machine and execute shell commands that restart the Docker application stack.
### Windows Lab — Docker in CI pipeline
Include a `docker build` step in your workflow, tagging the image with `${{ github.sha }}`.

