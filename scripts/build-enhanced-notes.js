/**
 * Generates enhanced week1-week17 notes aligned to INT332 DevOps syllabus.
 * Run: node scripts/build-enhanced-notes.js
 */
const fs = require('fs');
const path = require('path');

const img = (unit, file, caption) =>
  `\n![${caption}](../assets/screenshots/${unit}/${file}.svg)\n*${caption} — captured on Windows PowerShell + Docker Desktop*\n`;

const weeks = {
  week1: `# UNIT I: BASICS OF DEVOPS INFRASTRUCTURE
## WEEK 1: Introduction to Containers & DevOps Foundations

---

### 1.1 What is DevOps?
DevOps combines **Development (Dev)** and **Operations (Ops)** to deliver software faster and more reliably through automation, collaboration, and continuous feedback.

**Core objectives:**
- Continuous Integration & Continuous Delivery (CI/CD)
- Infrastructure as Code (IaC)
- Automated testing and monitoring
- Breaking silos between dev and ops teams

---

### 1.2 Origin of Containers
| Era | Technology | Limitation |
|-----|-----------|------------|
| Physical servers | One app per machine | Poor resource utilization |
| Virtual Machines (VMs) | Hypervisor + guest OS | Heavy — each VM runs full OS |
| **Containers** | Shared OS kernel, isolated processes | Lightweight, fast startup |

**Key insight:** Containers are **not** mini-VMs. They share the host kernel and isolate processes using Linux kernel features (namespaces + cgroups).

---

### 1.3 Process Isolation & Namespaces
**Namespaces** isolate what a process can *see*:

| Namespace | Isolates |
|-----------|----------|
| PID | Process IDs |
| NET | Network interfaces, ports, routing |
| MNT | Mount points / filesystem view |
| UTS | Hostname |
| IPC | Inter-process communication |
| USER | User/group IDs |

**Demo (inside a running container on Windows):**
\`\`\`powershell
docker run -it --rm alpine sh
# Inside container:
hostname          # container ID as hostname
ps                # only processes inside container
\`\`\`

---

### 1.4 Control Groups (cgroups)
**cgroups** limit what resources a process can *use*:
- CPU shares and quotas
- Memory limits (OOM killer per group)
- I/O bandwidth

Docker applies cgroups automatically when you use \`--memory\` or \`--cpus\`:
\`\`\`powershell
docker run -d --name limited-nginx --memory=128m --cpus=0.5 nginx:alpine
docker stats limited-nginx --no-stream
docker rm -f limited-nginx
\`\`\`

---

### 1.5 Container Images & Layers
- An **image** is a read-only template (stacked layers).
- A **container** is a running instance with a thin writable layer on top.
- Each Dockerfile instruction creates a new layer (cached for speed).

---

### 1.6 Image Registries & Distribution
- **Docker Hub** — public default registry (\`docker.io\`)
- **GHCR** — GitHub Container Registry (\`ghcr.io\`)
- **Private registries** — Harbor, AWS ECR, Azure ACR

\`\`\`powershell
docker pull httpd:alpine
docker images
\`\`\`
${img('unit-1', '02-docker-images', 'Listing pulled images on Windows')}

---

### 1.7 Introduction to Docker
Docker packages applications with dependencies into portable containers.

**Docker Architecture:**
\`\`\`
[Docker CLI]  -->  [Docker Daemon (dockerd)]  -->  [containerd]  -->  [runc]
                           |
                    [Images / Containers / Networks / Volumes]
                           |
                    [Docker Hub / GHCR / Private Registry]
\`\`\`

| Component | Role |
|-----------|------|
| **Docker CLI** | User commands (\`docker run\`, \`docker build\`) |
| **Docker Daemon** | Background service managing objects |
| **containerd** | Container runtime managing lifecycle |
| **runc** | OCI-compliant low-level runtime |

On **Windows**, Docker Desktop runs the Linux engine inside WSL2 or a lightweight VM.

---

### 1.8 Docker Object Types
| Object | Purpose |
|--------|---------|
| **Image** | Read-only blueprint |
| **Container** | Running (or stopped) instance |
| **Network** | Communication between containers |
| **Volume** | Persistent data storage |

---

### 1.9 Docker Layering & Filesystem
Docker uses **Union File Systems** (overlay2 on Linux):
- Lower layers: read-only image layers
- Top layer: container writable layer (Copy-on-Write)
- When a file is modified, it's copied to the writable layer

Inspect layers:
\`\`\`powershell
docker history httpd:alpine
\`\`\`
${img('unit-1', '07-docker-history', 'Image layer history')}

---

## PRACTICAL LAB 1 — Deploy Apache on Windows (Unit I)

**Scenario:** Pull Apache httpd, run on port 8081, verify in browser.

**Step 1 — Pull image:**
\`\`\`powershell
docker pull httpd:alpine
\`\`\`
${img('unit-1', '01-docker-pull-httpd', 'Pulling httpd:alpine from Docker Hub')}

**Step 2 — Run container:**
\`\`\`powershell
docker run -d --name apache-lab -p 8081:80 httpd:alpine
\`\`\`
${img('unit-1', '03-docker-run-apache', 'Starting Apache container')}

**Step 3 — Verify:**
\`\`\`powershell
docker ps
curl.exe http://localhost:8081
\`\`\`
${img('unit-1', '04-docker-ps', 'Running containers with port mapping')}
${img('unit-1', '05-curl-apache', 'HTTP response from Apache')}

**Step 4 — Inspect port mapping:**
\`\`\`powershell
docker inspect apache-lab --format "{{.NetworkSettings.Ports}}"
\`\`\`

**Step 5 — Cleanup:**
\`\`\`powershell
docker stop apache-lab
docker rm apache-lab
\`\`\`

---

## PRACTICAL LAB 2 — Custom HTML in Apache Container

\`\`\`powershell
docker run -d --name web-lab -p 8080:80 httpd:alpine
docker exec web-lab sh -c "echo '<h1>AMAN IS LEARNING DOCKER</h1>' > /usr/local/apache2/htdocs/index.html"
curl.exe http://localhost:8080
docker stop web-lab; docker rm web-lab
\`\`\`

Open **http://localhost:8080** in Edge/Chrome on Windows.

---

## PRACTICE QUESTIONS

1. What is the difference between a container image and a running container?
2. Explain how namespaces provide process isolation.
3. What role do cgroups play in container resource management?
4. Name the four main Docker object types.
5. Why does Docker use layered filesystems?

**Answers:**
1. Image = read-only template; Container = running instance with writable layer.
2. Namespaces restrict process view of PIDs, network, mounts, etc.
3. cgroups enforce CPU/memory/I/O limits per container.
4. Image, Container, Network, Volume.
5. Layer caching speeds builds; shared layers save disk; CoW enables efficient storage.
`,

  week2: `# UNIT I (continued): DOCKER ARCHITECTURE & OBJECTS
## WEEK 2: Container Runtime, CLI, Registry & Filesystem Deep Dive

---

### 2.1 Container Runtime Stack (OCI)
The **Open Container Initiative (OCI)** defines standards for container images and runtimes.

| Layer | Tool |
|-------|------|
| High-level runtime | containerd, CRI-O |
| Low-level runtime | runc, crun |
| Orchestration | Kubernetes, Docker Compose |

---

### 2.2 Docker CLI Essentials (Windows PowerShell)

\`\`\`powershell
docker version          # Client + server versions
docker info             # Daemon details, storage driver, CPUs
docker help run         # Command reference
\`\`\`

**Common object commands:**
\`\`\`powershell
docker images           # List images
docker ps               # Running containers
docker ps -a            # All containers
docker network ls       # Networks
docker volume ls        # Volumes
\`\`\`

---

### 2.3 Working with Containers — Lifecycle

\`\`\`powershell
docker run -d --name my-nginx -p 8082:80 nginx:alpine   # Create + start
docker stop my-nginx                                       # Stop gracefully
docker start my-nginx                                      # Restart stopped
docker restart my-nginx                                    # Stop + start
docker pause my-nginx                                      # Freeze processes
docker unpause my-nginx
docker rm -f my-nginx                                      # Force remove
\`\`\`

---

### 2.4 Copy Files: Container ↔ Host (Windows paths)

\`\`\`powershell
docker run -d --name file-lab nginx:alpine
docker exec file-lab sh -c "echo 'DevOps Notes' > /tmp/notes.txt"
docker cp file-lab:/tmp/notes.txt "$env:USERPROFILE\\Desktop\\notes.txt"
docker rm -f file-lab
\`\`\`

> **Windows tip:** Use \`$env:USERPROFILE\\Desktop\` instead of Linux \`/home/user/Desktop\`.

---

### 2.5 Docker Registry & Docker Hub

**Workflow:** Build → Tag → Push → Pull

\`\`\`powershell
docker tag httpd:alpine yourusername/my-httpd:1.0
docker login
docker push yourusername/my-httpd:1.0
docker pull yourusername/my-httpd:1.0
\`\`\`

**Tag format:** \`registry/namespace/repository:tag\`
- \`nginx:alpine\` → Docker Hub, library namespace
- \`ghcr.io/user/app:v1\` → GitHub Container Registry

---

### 2.6 Image Layers — Deep Dive

Each \`docker pull\` downloads only missing layers. Inspect with:
\`\`\`powershell
docker image inspect httpd:alpine --format "{{.RootFS.Layers}}"
docker history httpd:alpine
\`\`\`

**Benefits:**
- Faster builds (cache unchanged layers)
- Less disk (shared base layers)
- Faster deploys (partial pulls)

---

### 2.7 Copy-on-Write (CoW)
When a container modifies a file from a read-only layer:
1. File is copied to the writable container layer
2. Modification happens on the copy
3. Original image layer stays unchanged

This is why containers are ephemeral — delete container = lose writable layer.

---

### 2.8 Docker Desktop on Windows Architecture

\`\`\`
Windows Host
  └── Docker Desktop
        └── WSL2 Linux VM (dockerd runs here)
              └── Your Linux containers
\`\`\`

Enable WSL2 backend in Docker Desktop → Settings → General.

---

## PRACTICAL LAB — Explore Docker Objects

\`\`\`powershell
# Images
docker pull redis:alpine
docker images redis

# Container with env var
docker run -d --name redis-lab -e REDIS_PASSWORD=secret redis:alpine

# Logs
docker logs redis-lab

# Exec into container
docker exec -it redis-lab sh

# Cleanup
docker rm -f redis-lab
\`\`\`

---

## PRACTICE QUESTIONS

1. What is the OCI and why does it matter?
2. Difference between \`docker stop\` and \`docker kill\`?
3. Explain Docker Hub tagging convention.
4. What happens to data in the writable layer when a container is removed?
5. Why does Docker Desktop on Windows use WSL2?

**Answers:**
1. OCI standardizes container image format and runtime — enables interoperability.
2. \`stop\` sends SIGTERM (graceful); \`kill\` sends SIGKILL (immediate).
3. \`[registry/]namespace/repo:tag\` — defaults to Docker Hub/library if omitted.
4. Writable layer is deleted — data is lost unless stored in volumes.
5. Linux containers need a Linux kernel; WSL2 provides one efficiently on Windows.
`,

  week3: `# UNIT II: IMAGE BUILDING & CONTAINER MANAGEMENT
## WEEK 3: Dockerfile Core Concepts & Image Creation

---

### 3.1 Dockerfile Fundamentals
A **Dockerfile** is a text recipe for building an image layer-by-layer.

**Core instructions:**

| Instruction | Purpose |
|-------------|---------|
| \`FROM\` | Base image (required first instruction) |
| \`RUN\` | Execute command during build (creates layer) |
| \`COPY\` | Copy files from build context |
| \`ADD\` | Like COPY + auto-extract tar + URL fetch |
| \`WORKDIR\` | Set working directory |
| \`ENV\` | Set environment variables |
| \`EXPOSE\` | Document port (doesn't publish) |
| \`VOLUME\` | Declare mount point |
| \`CMD\` | Default command (overridable) |
| \`ENTRYPOINT\` | Main executable (harder to override) |

---

### 3.2 Build Context & .dockerignore
Everything sent to the daemon during \`docker build\` is the **build context**.

Create \`.dockerignore\` to exclude:
\`\`\`
node_modules
.git
*.md
.env
\`\`\`

Smaller context = faster builds.

---

### 3.3 Build Process (Windows)

\`\`\`powershell
cd labs\\unit-2-dockerfile
docker build -t devops-node-lab:1.0 .
\`\`\`
${img('unit-2', '01-docker-build', 'Building custom Node.js image on Windows')}

**Stages:**
1. Send build context to daemon
2. Execute each instruction (cache check per layer)
3. Tag final image

---

### 3.4 Inspecting Built Images

\`\`\`powershell
docker images devops-node-lab
docker history devops-node-lab:1.0
docker inspect devops-node-lab:1.0
\`\`\`
${img('unit-2', '02-docker-images', 'Custom built image listed')}
${img('unit-2', '03-docker-history', 'Layer history of custom image')}

---

### 3.5 Run & Test Custom Image

\`\`\`powershell
docker run -d --name devops-node-lab -p 3000:3000 devops-node-lab:1.0
curl.exe http://localhost:3000
\`\`\`
${img('unit-2', '04-docker-run', 'Running custom container')}
${img('unit-2', '05-curl-app', 'JSON response from custom app')}

---

### 3.6 Image Tagging & Versioning

\`\`\`powershell
docker tag devops-node-lab:1.0 devops-node-lab:1.1
docker tag devops-node-lab:1.0 yourusername/devops-node-lab:1.0
\`\`\`

**Best practices:**
- Use semantic versioning (\`1.0.0\`, \`1.0.1\`)
- Never rely on \`:latest\` in production
- Tag with Git commit SHA in CI

---

### 3.7 CMD vs ENTRYPOINT

\`\`\`dockerfile
# CMD — easily overridden
CMD ["node", "app.js"]

# ENTRYPOINT — fixed executable
ENTRYPOINT ["node", "app.js"]
CMD ["--port", "3000"]
\`\`\`

\`\`\`powershell
docker run myapp                    # runs entrypoint + default cmd
docker run myapp --port 4000        # entrypoint + override cmd args
\`\`\`

---

## PRACTICAL LAB — Build from labs/unit-2-dockerfile

See full project in \`labs/unit-2-dockerfile/\`:
- \`Dockerfile\` — multi-layer Node.js build
- \`.dockerignore\` — excludes node_modules
- \`app.js\` — returns "AMAN IS LEARNING DOCKER"

**Challenge:** Modify \`app.js\`, rebuild only the changed layers, observe cache behavior.

---

## PRACTICE QUESTIONS

1. What is the difference between COPY and ADD?
2. Why use .dockerignore?
3. What does EXPOSE actually do?
4. How does Docker layer caching work?
5. Write a Dockerfile for a Python Flask app on port 5000.

**Sample answer (Q5):**
\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
\`\`\`
`,

  week_4: `# UNIT II (continued): DOCKER NETWORKING & STORAGE
## WEEK 4: Networks, Volumes, Port Mapping & CoW

---

### 4.1 Docker Networking Overview
Containers are isolated by default. Docker networks enable communication.

| Network Driver | Use Case |
|----------------|----------|
| **bridge** | Default — containers on same host |
| **host** | Container uses host network directly |
| **overlay** | Multi-host (Swarm/Kubernetes) |
| **none** | No networking |

---

### 4.2 Bridge Network & Port Mapping

\`\`\`powershell
docker network create devnet-lab
docker network ls
docker network inspect devnet-lab
\`\`\`
${img('unit-2', '06-network-create', 'Creating custom bridge network')}
${img('unit-2', '07-network-ls', 'Listing custom network')}
${img('unit-2', '08-network-inspect', 'Network inspect output')}

**Port mapping** (\`-p host:container\`):
\`\`\`powershell
docker run -d -p 8080:80 --name web --network devnet-lab nginx:alpine
\`\`\`

Access from Windows browser: \`http://localhost:8080\`

---

### 4.3 DNS Inside Docker
On **custom bridge networks**, containers resolve each other by **name**:
\`\`\`powershell
docker run -d --name db --network devnet-lab mysql:8.0
docker run -d --name api --network devnet-lab my-api
# api connects to hostname "db" — not IP
\`\`\`

Default \`bridge\` network does NOT support DNS by container name.

---

### 4.4 Linking Containers (Legacy)
\`--link\` is deprecated. Use **custom user-defined networks** instead.

---

### 4.5 Volumes vs Bind Mounts

| Type | Managed by | Best for |
|------|-----------|----------|
| **Volume** | Docker | Production data (DB, uploads) |
| **Bind mount** | User path | Dev hot-reload, config files |
| **tmpfs** | Memory | Sensitive temp data |

\`\`\`powershell
docker volume create vol-lab
docker volume ls
docker run -d -v vol-lab:/data --name vol-test alpine sleep 3600
docker exec vol-test sh -c "echo hello > /data/test.txt"
docker rm -f vol-test
docker run --rm -v vol-lab:/data alpine cat /data/test.txt
\`\`\`
${img('unit-2', '09-volume-create', 'Creating named volume')}
${img('unit-2', '10-volume-ls', 'Listing volumes')}

**Bind mount (Windows path):**
\`\`\`powershell
docker run -d -v \${env:USERPROFILE}/devops-data:/data nginx:alpine
\`\`\`

---

### 4.6 Copy-on-Write Mechanism
Image layers = read-only. Container layer = writable CoW overlay.
- **Advantage:** Fast container creation, shared base
- **Risk:** Heavy writes fill container layer — use volumes for persistent/large data

---

### 4.7 Container Lifecycle Lab

\`\`\`powershell
docker run -d --name lifecycle nginx:alpine
docker pause lifecycle
docker unpause lifecycle
docker stop lifecycle
docker start lifecycle
docker restart lifecycle
docker rm lifecycle
\`\`\`

---

## PRACTICAL LAB — Two-Container Network

\`\`\`powershell
docker network create app-net
docker run -d --name redis --network app-net redis:alpine
docker run -it --rm --network app-net alpine ping -c 3 redis
docker network rm app-net
docker rm -f redis
\`\`\`

---

## PRACTICE QUESTIONS

1. Difference between bridge and host network?
2. When to use volumes vs bind mounts on Windows?
3. How does DNS work on custom bridge networks?
4. What is Copy-on-Write?
5. Map host port 9090 to container port 80 — write the flag.
`,

  week5: `# UNIT II (continued): CONTAINER REGISTRIES
## WEEK 5: Docker Hub, GHCR, Private Registries & Authentication

---

### 5.1 Registry Types
| Registry | URL format | Auth |
|----------|-----------|------|
| Docker Hub | \`docker.io/user/repo:tag\` | \`docker login\` |
| GHCR | \`ghcr.io/user/repo:tag\` | PAT token |
| Private (Harbor) | \`registry.company.com/repo:tag\` | Username/password or token |

---

### 5.2 Docker Hub Workflow (Windows)

\`\`\`powershell
docker build -t yourusername/devops-demo:1.0 .
docker login
docker push yourusername/devops-demo:1.0
docker pull yourusername/devops-demo:1.0
\`\`\`

---

### 5.3 GitHub Container Registry (GHCR)

**Step 1 — Create Personal Access Token (PAT):**
GitHub → Settings → Developer Settings → Personal Access Tokens  
Enable: \`write:packages\`, \`read:packages\`

**Step 2 — Build & tag:**
\`\`\`powershell
docker build -t ghcr.io/YOUR_GITHUB_USERNAME/devops-demo:1.0 .
\`\`\`

**Step 3 — Login (use PAT as password):**
\`\`\`powershell
docker login ghcr.io -u YOUR_GITHUB_USERNAME
# Password: paste PAT (NOT GitHub password)
\`\`\`

**Step 4 — Push:**
\`\`\`powershell
docker push ghcr.io/YOUR_GITHUB_USERNAME/devops-demo:1.0
\`\`\`

Verify at: \`https://github.com/YOUR_GITHUB_USERNAME?tab=packages\`

---

### 5.4 Private Registries
Enterprises run Harbor, Nexus, or cloud registries (ECR, ACR):
\`\`\`powershell
docker login registry.company.com
docker tag myapp:1.0 registry.company.com/team/myapp:1.0
docker push registry.company.com/team/myapp:1.0
\`\`\`

---

### 5.5 Access Tokens & Security
- Never commit tokens to Git
- Use GitHub Secrets in CI/CD
- Rotate tokens regularly
- Use read-only tokens for pull-only agents

---

## PRACTICAL LAB — Push to GHCR

1. Create \`labs/unit-2-dockerfile\` image tagged for GHCR
2. Login with PAT
3. Push and verify on GitHub Packages page
4. Pull on another machine to confirm

---

## PRACTICE QUESTIONS

1. What is the full image name format for GHCR?
2. Why use PAT instead of GitHub password for docker login?
3. Difference between public and private registry?
4. How to authenticate Docker in GitHub Actions for GHCR push?
5. What command lists all tags of a local image?
`
};

// Append enhanced Windows sections to weeks 6-17 from existing files
const repoDir = path.join(__dirname, '..');
const existingWeeks = ['week6','week7','week8','week9','week10','week11','week12','week13','week14','week15','week16','week17'];

const windowsHeader = `
---

## WINDOWS PRACTICAL SETUP

**Prerequisites:** Docker Desktop running, WSL2 enabled.

\`\`\`powershell
docker info
docker compose version
\`\`\`
`;

const weekEnhancements = {
  week6: windowsHeader + `\n### Windows Lab — Run inventory microservice\n\`\`\`powershell\ncd labs\\unit-2-dockerfile\ndocker build -t inventory-svc:1.0 .\ndocker run -d --name inventory -p 8081:3000 inventory-svc:1.0\ncurl.exe http://localhost:8081\n\`\`\`\n`,
  week7: windowsHeader + `\n### Windows Lab — Multi-service Compose\n\`\`\`powershell\ncd labs\\unit-3-wordpress\ndocker compose config   # validate YAML\ndocker compose up -d\n\`\`\`\n`,
  week8: `\n### Windows Lab — WordPress + MySQL\n\`\`\`powershell\ncd labs\\unit-3-wordpress\ndocker compose up -d\ndocker compose ps\n# Open http://localhost:8000 in browser\n\`\`\`\n` + img('unit-3', '01-compose-up', 'docker compose up on Windows') + img('unit-3', '02-compose-ps', 'Compose services running') + img('unit-3', '03-compose-logs', 'Database container logs'),
  week9: windowsHeader + `\n### Windows Lab — Maven project\n\`\`\`powershell\ncd labs\\unit-4-maven\nmvn -B clean verify\njava -jar target\\calculator-app-1.0.0-SNAPSHOT.jar\n\`\`\`\n` + img('unit-4', '01-mvn-version', 'Maven version on Windows') + img('unit-4', '02-mvn-clean-verify', 'Maven clean verify build'),
  week10: img('unit-4', '03-mvn-dependency-tree', 'Maven dependency tree') + `\n\`\`\`powershell\ncd labs\\unit-4-maven\nmvn dependency:tree\n\`\`\`\n`,
  week11: `\n### Windows Lab — Dockerize Maven app\n\`\`\`powershell\ncd labs\\unit-4-maven\nmvn -B clean package\n# Create Dockerfile with FROM eclipse-temurin:17-jre-alpine\n# COPY target/*.jar app.jar\n# ENTRYPOINT ["java","-jar","/app.jar"]\ndocker build -t maven-docker-lab:1.0 .\ndocker run -p 8080:8080 maven-docker-lab:1.0\n\`\`\`\n`,
  week12: `\n### Windows Lab — GitHub Actions workflow\nCopy \`labs/unit-5-github-actions/.github/workflows/java-ci.yml\` to your repo.\nPush to GitHub and verify Actions tab.\n`,
  week13: `\n### Windows Lab — Matrix build\nAdd strategy.matrix with Java 17 and 21 in workflow YAML.\n`,
  week14: `\n### Windows Lab — Docker in CI\nAdd step:\n\`\`\`yaml\n- name: Build Docker image\n  run: docker build -t myapp:\${{ github.sha }} ./labs/unit-2-dockerfile\n\`\`\`\n`,
  week15: `\n### Windows Lab — Jenkins in Docker\n\`\`\`powershell\ndocker volume create jenkins_home\ndocker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins-lab jenkins/jenkins:lts\ndocker exec jenkins-lab cat /var/jenkins_home/secrets/initialAdminPassword\n# Open http://localhost:8080\n\`\`\`\n`,
  week16: `\n### Windows Lab — Jenkinsfile\nCreate Jenkinsfile with stages: Checkout, Build, Test, Package.\n`,
  week17: `\n### Windows Lab — Jenkins + Maven + Docker\nConfigure Maven and Docker tools in Jenkins Global Tool Configuration.\nRun pipeline that builds Maven JAR and Docker image.\n`
};

// Write weeks 1-5 and week_4 from template
for (const [name, content] of Object.entries(weeks)) {
  fs.writeFileSync(path.join(repoDir, name), content.trim() + '\n');
  console.log('Wrote', name);
}

// Enhance weeks 6-17
for (const w of existingWeeks) {
  const filePath = path.join(repoDir, w);
  let content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
  if (!content.includes('WINDOWS PRACTICAL SETUP') && !content.includes('Windows Lab')) {
    content += weekEnhancements[w] || windowsHeader;
  } else if (weekEnhancements[w]) {
    content += weekEnhancements[w];
  }
  fs.writeFileSync(filePath, content.trim() + '\n');
  console.log('Enhanced', w);
}

// Also write week4 as copy of week_4 for consistency
if (weeks.week_4) {
  fs.writeFileSync(path.join(repoDir, 'week4'), weeks.week_4.trim() + '\n');
  console.log('Wrote week4');
}

console.log('Done — enhanced notes generated.');
