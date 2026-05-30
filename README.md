# INT332 — Advanced DevOps Course Notes & Practical Labs

[![Docker](https://img.shields.io/badge/Docker-Desktop-blue?logo=docker)](https://www.docker.com/products/docker-desktop/)
[![Maven](https://img.shields.io/badge/Maven-Build-red?logo=apache-maven)](https://maven.apache.org/)
[![GitHub Actions](https://img.shields.io/badge/CI-GitHub_Actions-2088FF?logo=github-actions)](https://github.com/features/actions)

**Complete syllabus-aligned DevOps notes** with theory, **Windows PowerShell labs**, runnable projects, and **real terminal screenshots** captured on Docker Desktop for Windows.

Repository: [github.com/softways1/INT332](https://github.com/softways1/INT332)

---

## What’s Inside

| Folder / File | Description |
|---------------|-------------|
| `week1` … `week17` | Week-wise notes — theory + labs + practice questions |
| `labs/` | Runnable lab projects (Dockerfile, Compose, Maven, CI workflows) |
| `assets/screenshots/` | Real command output from Windows (SVG terminal screenshots) |
| `notes/README.md` | Detailed index and setup guide |
| `All Questions Solutions` | Exam-style question answers |

---

## Syllabus Coverage

### Unit I — Basics of DevOps Infrastructure
**Weeks:** `week1`, `week2`

- Origin of containers, modern containerization, DevOps integration
- Container runtime, namespaces, cgroups
- Container images, layers, registries
- Docker architecture (CLI, daemon, Hub)
- Object types: container, image, network, volume
- Layering & filesystem (overlay2, Copy-on-Write)

### Unit II — Image Building & Container Management
**Weeks:** `week3`, `week4`, `week5`

- Dockerfile instructions (FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, …)
- Build context, `.dockerignore`, `docker build`, tagging
- Bridge/host/overlay networks, DNS, port mapping
- Volumes vs bind mounts, CoW mechanism
- Docker Hub, GHCR, private registries, PAT authentication

### Unit III — Microservices with Docker Compose
**Weeks:** `week6`, `week7`, `week8`

- Monolithic vs microservices, API Gateway
- Compose YAML: services, volumes, networks, env, secrets
- `depends_on`, healthchecks, build vs image
- WordPress + MySQL, Node.js + MongoDB, Spring Boot + PostgreSQL

### Unit IV — Maven Build Automation
**Weeks:** `week9`, `week10`, `week11`

- POM structure, build lifecycle phases
- Dependency scope, transitive deps, version conflicts
- Compiler, Surefire, Shade plugins, Maven Wrapper
- Dockerizing Maven apps, registry push

### Unit V — CI with GitHub Actions
**Weeks:** `week12`, `week13`, `week14`

- Workflows, triggers (push, PR, schedule, manual)
- Jobs, steps, actions, runners
- Matrix strategies, caching, multi-job pipelines
- Docker build/push in CI, GHCR, deployments

### Unit VI — CI/CD with Jenkins
**Weeks:** `week15`, `week16`, `week17`

- Master/agent architecture, plugins, security/RBAC
- Declarative vs scripted pipelines, Jenkinsfile
- Docker & Maven in Jenkins, webhooks, shared libraries

---

## Windows Setup (Required for Labs)

1. **Docker Desktop for Windows** — enable WSL2 backend
2. **PowerShell** (built-in)
3. **Java JDK 17+** and **Maven** — Unit IV
4. **Git** — Unit V/VI

```powershell
docker --version
docker compose version
java -version
mvn -version
```

---

## Quick Start — Run Your First Lab

```powershell
git clone https://github.com/softways1/INT332.git
cd INT332

# Unit I — Run Apache
docker pull httpd:alpine
docker run -d --name apache-lab -p 8081:80 httpd:alpine
curl.exe http://localhost:8081
# Browser: http://localhost:8081

# Unit II — Build custom image
cd labs\unit-2-dockerfile
docker build -t devops-node-lab:1.0 .
docker run -d -p 3000:3000 devops-node-lab:1.0
curl.exe http://localhost:3000

# Unit III — WordPress + MySQL
cd ..\unit-3-wordpress
docker compose up -d
# Browser: http://localhost:8000

# Unit IV — Maven build
cd ..\unit-4-maven
mvn -B clean verify
```

---

## Lab Projects

| Lab | Path | Syllabus Unit |
|-----|------|---------------|
| Apache httpd deployment | `labs/unit-1-apache/` | Unit I |
| Custom Node.js Dockerfile | `labs/unit-2-dockerfile/` | Unit II |
| WordPress + MySQL Compose | `labs/unit-3-wordpress/` | Unit III |
| Maven calculator app | `labs/unit-4-maven/` | Unit IV |
| GitHub Actions CI workflow | `labs/unit-5-github-actions/` | Unit V |
| Jenkins Docker setup | `labs/unit-6-jenkins/` | Unit VI |

---

## Screenshots

All screenshots in `assets/screenshots/` were captured by running commands on **Windows 11 + Docker Desktop + PowerShell**. They show real output from:

- `docker pull`, `docker run`, `docker ps`, `docker build`
- `docker network`, `docker volume` commands
- `docker compose up` (WordPress stack)
- `mvn clean verify` (Maven lifecycle)


