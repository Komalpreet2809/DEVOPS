# INT332 DevOps — Detailed Notes & Lab Guide

Syllabus-aligned course notes featuring **hands-on labs for Windows (PowerShell + Docker Desktop)** alongside real terminal output screenshots.

## Directory Layout

- `Unit1_*.md` through `Unit6_*.md` — Topic-wise modules covering theory, labs, and exercises
- `labs/` — Self-contained lab projects — clone and run directly on Windows
- `assets/screenshots/` — Authentic terminal output captured on Windows (`.svg` screenshot files)
- `scripts/` — Helper tools for generating screenshot SVGs from command output

## System Requirements (Windows)

1. **Docker Desktop** — [Download for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
2. **PowerShell 5.1+** (included with Windows)
3. **Java JDK 17+** and **Apache Maven** — required for Unit IV exercises
4. **Node.js 18+** — optional, useful for microservice demos
5. **Git** — required for Unit V/VI labs

Confirm everything is working:

```powershell
docker --version
java -version
mvn -version
node --version
git --version
```

## Course Outline

### Unit I — DevOps Infrastructure Essentials (`Unit1_ContainersAndDevOps.md`, `Unit1_DockerArchitecture.md`)
Containers, namespaces, control groups, Docker platform architecture, object types, image layering.

**Lab:** `labs/lab1-apache-deployment/` (pull & run httpd)  
**Screenshots:** `assets/screenshots/unit-1/`

### Unit II — Image Creation & Container Operations (`Unit2_DockerfileAndImages.md`, `Unit2_NetworkingAndVolumes.md`, `Unit2_RegistriesAndDistribution.md`)
Dockerfile syntax, build workflow, networking modes, volumes, registries (Docker Hub, GHCR).

**Lab:** `labs/lab2-custom-image/`  
**Screenshots:** `assets/screenshots/unit-2/`

### Unit III — Multi-Container Apps with Docker Compose (`Unit3_MicroservicesIntro.md`, `Unit3_DockerCompose.md`, `Unit3_MultiContainerApps.md`)
Service-oriented design, compose YAML structure, WordPress+MySQL, Node+MongoDB, Spring+Postgres stacks.

**Lab:** `labs/lab3-compose-stack/`  
**Screenshots:** `assets/screenshots/unit-3/`

### Unit IV — Maven Build Toolchain (`Unit4_MavenFundamentals.md`, `Unit4_DependencyManagement.md`, `Unit4_MavenPlugins.md`)
POM configuration, lifecycle phases, dependencies, plugins, Maven + Docker workflows.

**Lab:** `labs/lab4-maven-project/`  
**Screenshots:** `assets/screenshots/unit-4/`

### Unit V — CI Using GitHub Actions (`Unit5_GitHubActionsIntro.md`, `Unit5_WorkflowsAndJobs.md`, `Unit5_CIDeployments.md`)
Workflow files, jobs, matrix strategies, caching, Docker in CI, deployment steps.

**Lab:** `labs/lab5-ci-workflow/.github/workflows/`

### Unit VI — CI/CD Using Jenkins (`Unit6_JenkinsSetup.md`, `Unit6_JenkinsPipelines.md`, `Unit6_JenkinsAdvanced.md`)
Controller-agent model, pipeline syntax, Jenkinsfile, Docker/Maven integration.

**Lab:** `labs/lab6-jenkins-setup/`

## Running a Lab (Windows)

```powershell
# Example: Unit II — create a custom Node.js image
cd labs\lab2-custom-image
docker build -t node-app-demo:1.0 .
docker run -d --name node-app-demo -p 3001:3001 node-app-demo:1.0
curl.exe http://localhost:3001
docker stop node-app-demo; docker rm node-app-demo
```

## Regenerating Screenshots

After completing a lab on your machine, capture the output and convert it to SVG format:

```powershell
docker ps | Out-File assets\screenshots\unit-1\lab-output.txt -Encoding utf8
node scripts\terminal-to-svg.js assets\screenshots\unit-1\lab-output.txt assets\screenshots\unit-1\lab-output.svg "Lab Output"
```
