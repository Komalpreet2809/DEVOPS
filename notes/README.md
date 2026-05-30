# INT332 DevOps Course — Enhanced Notes Index

Complete syllabus-aligned notes with **Windows (PowerShell + Docker Desktop)** practical labs and real terminal screenshots.

## Repository Structure

| Path | Description |
|------|-------------|
| `week1` … `week17` | Week-wise notes (theory + labs + questions) |
| `labs/` | Runnable lab projects — copy, run on your Windows machine |
| `assets/screenshots/` | Real command output captured on Windows (`.svg` terminal screenshots) |
| `scripts/` | Utilities to regenerate screenshot SVGs from terminal output |

## Prerequisites (Windows)

1. **Docker Desktop** — [Install Docker Desktop for Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
2. **PowerShell 5.1+** (built into Windows)
3. **Java JDK 17+** and **Apache Maven** — for Unit IV labs
4. **Node.js 18+** — optional, for microservice labs
5. **Git** — for Unit V/VI integration labs

Verify setup:

```powershell
docker --version
java -version
mvn -version
node --version
git --version
```

## Syllabus Map

### Unit I — Basics of DevOps Infrastructure (`week1`, `week2`)
Containers, namespaces, cgroups, Docker architecture, object types, layering.

**Lab:** `labs/unit-1-apache/` (pull & run httpd)  
**Screenshots:** `assets/screenshots/unit-1/`

### Unit II — Image Building & Container Management (`week3`, `week_4`, `week5`)
Dockerfile, build process, networking, volumes, registries (Docker Hub, GHCR).

**Lab:** `labs/unit-2-dockerfile/`  
**Screenshots:** `assets/screenshots/unit-2/`

### Unit III — Microservices with Docker Compose (`week6`, `week7`, `week8`)
Architecture, compose YAML, WordPress+MySQL, Node+MongoDB, Spring+Postgres.

**Lab:** `labs/unit-3-wordpress/`  
**Screenshots:** `assets/screenshots/unit-3/`

### Unit IV — Maven Build Automation (`week9`, `week10`, `week11`)
POM, lifecycle, dependencies, plugins, Maven + Docker integration.

**Lab:** `labs/unit-4-maven/`  
**Screenshots:** `assets/screenshots/unit-4/`

### Unit V — CI with GitHub Actions (`week12`, `week13`, `week14`)
Workflows, jobs, matrix, caching, Docker in CI, deployments.

**Lab:** `labs/unit-5-github-actions/.github/workflows/`

### Unit VI — CI/CD with Jenkins (`week15`, `week16`, `week17`)
Architecture, pipelines, Jenkinsfile, Docker/Maven integration.

**Lab:** `labs/unit-6-jenkins/`

## How to Run a Lab (Windows)

```powershell
# Example: Unit II — build custom Node.js image
cd labs\unit-2-dockerfile
docker build -t devops-node-lab:1.0 .
docker run -d --name devops-node-lab -p 3000:3000 devops-node-lab:1.0
curl.exe http://localhost:3000
docker stop devops-node-lab; docker rm devops-node-lab
```

## Regenerate Screenshots

After running labs locally, capture output and convert to SVG:

```powershell
docker ps | Out-File assets\screenshots\unit-1\my-output.txt -Encoding utf8
node scripts\terminal-to-svg.js assets\screenshots\unit-1\my-output.txt assets\screenshots\unit-1\my-output.svg "My Lab Title"
```
