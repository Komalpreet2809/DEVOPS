# INT332 DevOps — Detailed Notes & Lab Guide

Syllabus-aligned course notes featuring **hands-on labs for Windows (PowerShell + Docker Desktop)** alongside real terminal output screenshots.

## Directory Layout

- `week1` … `week17` — Weekly modules covering theory, labs, and exercises
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

### Unit I — DevOps Infrastructure Essentials (`week1`, `week2`)
Containers, namespaces, control groups, Docker platform architecture, object types, image layering.

**Lab:** `labs/unit-1-apache/` (pull & run httpd)  
**Screenshots:** `assets/screenshots/unit-1/`

### Unit II — Image Creation & Container Operations (`week3`, `week_4`, `week5`)
Dockerfile syntax, build workflow, networking modes, volumes, registries (Docker Hub, GHCR).

**Lab:** `labs/unit-2-dockerfile/`  
**Screenshots:** `assets/screenshots/unit-2/`

### Unit III — Multi-Container Apps with Docker Compose (`week6`, `week7`, `week8`)
Service-oriented design, compose YAML structure, WordPress+MySQL, Node+MongoDB, Spring+Postgres stacks.

**Lab:** `labs/unit-3-wordpress/`  
**Screenshots:** `assets/screenshots/unit-3/`

### Unit IV — Maven Build Toolchain (`week9`, `week10`, `week11`)
POM configuration, lifecycle phases, dependencies, plugins, Maven + Docker workflows.

**Lab:** `labs/unit-4-maven/`  
**Screenshots:** `assets/screenshots/unit-4/`

### Unit V — CI Using GitHub Actions (`week12`, `week13`, `week14`)
Workflow files, jobs, matrix strategies, caching, Docker in CI, deployment steps.

**Lab:** `labs/unit-5-github-actions/.github/workflows/`

### Unit VI — CI/CD Using Jenkins (`week15`, `week16`, `week17`)
Controller-agent model, pipeline syntax, Jenkinsfile, Docker/Maven integration.

**Lab:** `labs/unit-6-jenkins/`

## Running a Lab (Windows)

```powershell
# Example: Unit II — create a custom Node.js image
cd labs\unit-2-dockerfile
docker build -t node-app-demo:1.0 .
docker run -d --name node-app-demo -p 3001:3000 node-app-demo:1.0
curl.exe http://localhost:3001
docker stop node-app-demo; docker rm node-app-demo
```

## Regenerating Screenshots

After completing a lab on your machine, capture the output and convert it to SVG format:

```powershell
docker ps | Out-File assets\screenshots\unit-1\lab-output.txt -Encoding utf8
node scripts\terminal-to-svg.js assets\screenshots\unit-1\lab-output.txt assets\screenshots\unit-1\lab-output.svg "Lab Output"
```
