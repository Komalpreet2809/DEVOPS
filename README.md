# INT332 — DevOps Engineering: Notes, Labs & Practice

**Comprehensive DevOps course material** covering theory, **hands-on PowerShell labs**, executable projects, and **authentic terminal output screenshots** produced using Docker Desktop on Windows.

---

## Contents Overview

- `Unit1_ContainersAndDevOps.md`, `Unit1_DockerArchitecture.md` — Part A modules
- `Unit2_DockerfileAndImages.md`, `Unit2_NetworkingAndVolumes.md`, `Unit2_NetworkingNotes.md`, `Unit2_RegistriesAndDistribution.md` — Part B modules
- `Unit3_MicroservicesIntro.md`, `Unit3_DockerCompose.md`, `Unit3_MultiContainerApps.md` — Part C modules
- `Unit4_MavenFundamentals.md`, `Unit4_DependencyManagement.md`, `Unit4_MavenPlugins.md` — Part D modules
- `Unit5_GitHubActionsIntro.md`, `Unit5_WorkflowsAndJobs.md`, `Unit5_CIDeployments.md` — Part E modules
- `Unit6_JenkinsSetup.md`, `Unit6_JenkinsPipelines.md`, `Unit6_JenkinsAdvanced.md` — Part F modules
- `labs/` — Ready-to-run lab projects (Dockerfile, Compose, Maven, CI pipelines)
- `assets/screenshots/` — Actual terminal output from Windows sessions (SVG format)
- `notes/README.md` — Comprehensive index with environment setup instructions
- `ExamPractice_Solutions.md` — Practice questions with worked solutions

---

## Topics Covered

### Part A — DevOps Infrastructure Fundamentals
**Modules:** `Unit1_ContainersAndDevOps.md`, `Unit1_DockerArchitecture.md`

- Evolution of containers, modern containerization practices, DevOps workflow
- Container runtime internals, namespaces, control groups
- Container images, layered filesystem, image registries
- Docker platform components (CLI, daemon, Docker Hub)
- Core object types: containers, images, networks, volumes
- Storage layering & filesystem mechanics (overlay2, Copy-on-Write)

### Part B — Building Images & Managing Containers
**Modules:** `Unit2_DockerfileAndImages.md`, `Unit2_NetworkingAndVolumes.md`, `Unit2_RegistriesAndDistribution.md`

- Dockerfile directives (FROM, RUN, COPY, ADD, CMD, ENTRYPOINT, etc.)
- Build context, `.dockerignore`, `docker build`, image tagging
- Network modes: bridge, host, overlay — DNS resolution, port forwarding
- Volumes versus bind mounts, Copy-on-Write behavior
- Docker Hub, GitHub Container Registry, private registries, token-based auth

### Part C — Microservices & Docker Compose
**Modules:** `Unit3_MicroservicesIntro.md`, `Unit3_DockerCompose.md`, `Unit3_MultiContainerApps.md`

- Monolithic vs microservice design, API Gateway patterns
- Compose YAML syntax: services, volumes, networks, environment variables, secrets
- Service dependencies (`depends_on`), healthchecks, build vs image directives
- Example stacks: WordPress + MySQL, Node.js + MongoDB, Spring Boot + PostgreSQL

### Part D — Build Automation with Maven
**Modules:** `Unit4_MavenFundamentals.md`, `Unit4_DependencyManagement.md`, `Unit4_MavenPlugins.md`

- POM file anatomy, build lifecycle stages
- Dependency scoping, transitive dependencies, version resolution
- Key plugins: Compiler, Surefire, Shade — Maven Wrapper usage
- Containerizing Maven applications, pushing to registries

### Part E — Continuous Integration via GitHub Actions
**Modules:** `Unit5_GitHubActionsIntro.md`, `Unit5_WorkflowsAndJobs.md`, `Unit5_CIDeployments.md`

- Workflow definitions, trigger events (push, PR, cron, manual dispatch)
- Jobs, steps, reusable actions, hosted runners
- Matrix builds, dependency caching, multi-job workflows
- Docker image build/push within CI, GHCR integration, deployment stages

### Part F — CI/CD Pipelines with Jenkins
**Modules:** `Unit6_JenkinsSetup.md`, `Unit6_JenkinsPipelines.md`, `Unit6_JenkinsAdvanced.md`

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
cd labs\lab2-custom-image
docker build -t node-app-demo:1.0 .
docker run -d -p 3001:3001 node-app-demo:1.0
curl.exe http://localhost:3001

# Part C — WordPress + MySQL stack
cd ..\lab3-compose-stack
docker compose up -d
# Open in browser: http://localhost:8005

# Part D — Maven project build
cd ..\lab4-maven-project
mvn -B clean verify
```

---

## Lab Directory

- **Apache httpd deployment** — `labs/lab1-apache-deployment/` (Part A)
- **Custom Node.js Dockerfile** — `labs/lab2-custom-image/` (Part B)
- **WordPress + MySQL Compose** — `labs/lab3-compose-stack/` (Part C)
- **Maven calculator project** — `labs/lab4-maven-project/` (Part D)
- **GitHub Actions CI pipeline** — `labs/lab5-ci-workflow/` (Part E)
- **Jenkins Docker configuration** — `labs/lab6-jenkins-setup/` (Part F)

---

## Terminal Screenshots

Every screenshot under `assets/screenshots/` was generated on a **Windows 11 machine running Docker Desktop with PowerShell**. They capture real output from:

- `docker pull`, `docker run`, `docker ps`, `docker build`
- `docker network`, `docker volume` operations
- `docker compose up` (WordPress multi-container stack)
- `mvn clean verify` (Maven build lifecycle)
