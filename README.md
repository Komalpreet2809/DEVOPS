# INT332 — DevOps Engineering: Notes, Labs & Practice

**Comprehensive DevOps course material** covering theory, **hands-on PowerShell labs**, executable projects, and **authentic terminal output screenshots** produced using Docker Desktop on Windows.

---

## Contents Overview

- `week1` through `week17` — Weekly modules containing theory, lab exercises, and practice problems
- `labs/` — Ready-to-run lab projects (Dockerfile, Compose, Maven, CI pipelines)
- `assets/screenshots/` — Actual terminal output from Windows sessions (SVG format)
- `notes/README.md` — Comprehensive index with environment setup instructions
- `All Questions Solutions` — Practice questions with worked solutions

---

## Topics Covered

### Part A — DevOps Infrastructure Fundamentals
**Modules:** `week1`, `week2`

- Evolution of containers, modern containerization practices, DevOps workflow
- Container runtime internals, namespaces, control groups
- Container images, layered filesystem, image registries
- Docker platform components (CLI, daemon, Docker Hub)
- Core object types: containers, images, networks, volumes
- Storage layering & filesystem mechanics (overlay2, Copy-on-Write)

### Part B — Building Images & Managing Containers
**Modules:** `week3`, `week4`, `week5`

- Dockerfile directives (FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, etc.)
- Build context, `.dockerignore`, `docker build`, image tagging
- Network modes: bridge, host, overlay — DNS resolution, port forwarding
- Volumes versus bind mounts, Copy-on-Write behavior
- Docker Hub, GitHub Container Registry, private registries, token-based auth

### Part C — Microservices & Docker Compose
**Modules:** `week6`, `week7`, `week8`

- Monolithic vs microservice design, API Gateway patterns
- Compose YAML syntax: services, volumes, networks, environment variables, secrets
- Service dependencies (`depends_on`), healthchecks, build vs image directives
- Example stacks: WordPress + MySQL, Node.js + MongoDB, Spring Boot + PostgreSQL

### Part D — Build Automation with Maven
**Modules:** `week9`, `week10`, `week11`

- POM file anatomy, build lifecycle stages
- Dependency scoping, transitive dependencies, version resolution
- Key plugins: Compiler, Surefire, Shade — Maven Wrapper usage
- Containerizing Maven applications, pushing to registries

### Part E — Continuous Integration via GitHub Actions
**Modules:** `week12`, `week13`, `week14`

- Workflow definitions, trigger events (push, PR, cron, manual dispatch)
- Jobs, steps, reusable actions, hosted runners
- Matrix builds, dependency caching, multi-job workflows
- Docker image build/push within CI, GHCR integration, deployment stages

### Part F — CI/CD Pipelines with Jenkins
**Modules:** `week15`, `week16`, `week17`

- Controller/agent topology, plugin ecosystem, security & RBAC
- Declarative vs scripted pipeline syntax, Jenkinsfile authoring
- Docker & Maven integration in Jenkins, webhook triggers, shared libraries

---

## Environment Setup (Windows)

1. **Docker Desktop for Windows** — make sure WSL2 backend is enabled
2. **PowerShell** (pre-installed on Windows)
3. **Java JDK 17+** along with **Maven** — needed for Part D
4. **Git** — needed for Part E and Part F

```powershell
# Verify all tools are installed
docker --version
docker compose version
java -version
mvn -version
```

---

## Getting Started — First Lab

```powershell
# Part A — Launch Apache httpd
docker pull httpd:alpine
docker run -d --name httpd-server -p 8085:80 httpd:alpine
curl.exe http://localhost:8085
# Open in browser: http://localhost:8085

# Part B — Build a custom image
cd labs\unit-2-dockerfile
docker build -t node-app-demo:1.0 .
docker run -d -p 3001:3000 node-app-demo:1.0
curl.exe http://localhost:3001

# Part C — WordPress + MySQL stack
cd ..\unit-3-wordpress
docker compose up -d
# Open in browser: http://localhost:8005

# Part D — Maven project build
cd ..\unit-4-maven
mvn -B clean verify
```

---

## Lab Directory

- **Apache httpd deployment** — `labs/unit-1-apache/` (Part A)
- **Custom Node.js Dockerfile** — `labs/unit-2-dockerfile/` (Part B)
- **WordPress + MySQL Compose** — `labs/unit-3-wordpress/` (Part C)
- **Maven calculator project** — `labs/unit-4-maven/` (Part D)
- **GitHub Actions CI pipeline** — `labs/unit-5-github-actions/` (Part E)
- **Jenkins Docker configuration** — `labs/unit-6-jenkins/` (Part F)

---

## Terminal Screenshots

Every screenshot under `assets/screenshots/` was generated on a **Windows 11 machine running Docker Desktop with PowerShell**. They capture real output from:

- `docker pull`, `docker run`, `docker ps`, `docker build`
- `docker network`, `docker volume` operations
- `docker compose up` (WordPress multi-container stack)
- `mvn clean verify` (Maven build lifecycle)
