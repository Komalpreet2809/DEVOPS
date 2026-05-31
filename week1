# UNIT I: DEVOPS INFRASTRUCTURE FUNDAMENTALS
## WEEK 1: Containers, DevOps Principles & Core Concepts

---

### A. Understanding DevOps
DevOps is a methodology that bridges the gap between **Development (Dev)** and **Operations (Ops)** teams, enabling faster software delivery through automation, teamwork, and iterative feedback loops.

**Primary goals:**
- Automating build, test, and deployment pipelines (CI/CD)
- Managing infrastructure through code (IaC)
- Implementing automated testing and system monitoring
- Eliminating communication barriers between development and operations

---

### B. Evolution of Containerization
- **Physical servers** — One application per machine, leading to wasted resources
- **Virtual Machines (VMs)** — Hypervisor-based isolation with full guest OS, but heavyweight
- **Containers** — Process-level isolation sharing the host OS kernel, extremely lightweight and fast to start

**Important distinction:** Containers should not be confused with lightweight VMs. They leverage Linux kernel capabilities (namespaces and cgroups) to isolate processes while sharing the same kernel.

---

### C. Namespaces & Process Isolation
**Namespaces** control what a process is allowed to *see*:

- **PID** — Isolates process ID trees
- **NET** — Separates network interfaces, ports, and routing tables
- **MNT** — Provides distinct filesystem mount points
- **UTS** — Gives each container its own hostname
- **IPC** — Isolates inter-process communication channels
- **USER** — Maps user and group IDs separately per container

**Example (running inside a container on Windows):**
```powershell
docker run -it --rm alpine sh
# Within the container shell:
hostname          # displays the container ID
ps                # shows only container-local processes
```

---

### D. Resource Limits with Control Groups (cgroups)
**cgroups** restrict what system resources a process can *consume*:
- CPU time allocation and quotas
- Memory caps (triggers OOM killer when exceeded)
- Disk I/O throughput control

Docker enforces cgroups transparently when flags like `--memory` or `--cpus` are specified:
```powershell
docker run -d --name resource-test --memory=128m --cpus=0.5 nginx:alpine
docker stats resource-test --no-stream
docker rm -f resource-test
```

---

### E. Understanding Container Images & Layers
- An **image** is an immutable, read-only template composed of stacked layers.
- A **container** is a live instance of an image with an additional thin writable layer.
- Every instruction in a Dockerfile generates a new layer, which Docker caches to speed up rebuilds.

---

### F. Image Registries & Distribution
- **Docker Hub** — the default public registry (`docker.io`)
- **GHCR** — GitHub's own Container Registry (`ghcr.io`)
- **Private registries** — options like Harbor, AWS ECR, Azure ACR

```powershell
docker pull httpd:alpine
docker images
```

![Viewing downloaded images in PowerShell](assets/screenshots/unit-1/02-docker-images.svg)
*Viewing downloaded images — Docker Desktop on Windows*


---

### G. Docker Overview
Docker wraps applications along with their dependencies into self-contained, portable containers.

**Architecture at a glance:**
```
[Docker CLI]  -->  [Docker Daemon (dockerd)]  -->  [containerd]  -->  [runc]
                           |
                    [Images / Containers / Networks / Volumes]
                           |
                    [Docker Hub / GHCR / Private Registry]
```

- **Docker CLI** — Interface for user commands (`docker run`, `docker build`)
- **Docker Daemon** — Background service that manages all Docker objects
- **containerd** — High-level runtime handling container lifecycle
- **runc** — Low-level OCI-compliant runtime for spawning containers

On **Windows**, Docker Desktop runs the Linux engine through WSL2 or a lightweight Hyper-V VM.

---

### H. Docker Object Types
- **Image** — A read-only blueprint for creating containers
- **Container** — A running (or stopped) instance of an image
- **Network** — Enables communication between containers
- **Volume** — Provides persistent data storage

---

### I. Docker Layering & Union Filesystem
Docker relies on **Union File Systems** (overlay2 on Linux):
- Base layers are read-only image layers
- The topmost layer is a writable container layer using Copy-on-Write (CoW)
- Modifying a file causes it to be copied up to the writable layer first

To inspect the layer structure:
```powershell
docker history httpd:alpine
```

![Inspecting image layer structure](assets/screenshots/unit-1/07-docker-history.svg)
*Layer details for httpd:alpine — Docker Desktop on Windows*


---

## LAB EXERCISE 1 — Deploying Apache on Windows

**Objective:** Pull the Apache httpd image, run it on port 8085, and confirm it works in the browser.

**Step 1 — Download the image:**
```powershell
docker pull httpd:alpine
```

![Downloading httpd:alpine from registry](assets/screenshots/unit-1/01-docker-pull-httpd.svg)
*Downloading httpd:alpine — Docker Desktop on Windows*


**Step 2 — Launch the container:**
```powershell
docker run -d --name httpd-server -p 8085:80 httpd:alpine
```

![Launching Apache container in detached mode](assets/screenshots/unit-1/03-docker-run-apache.svg)
*Apache container started — Docker Desktop on Windows*


**Step 3 — Confirm it is running:**
```powershell
docker ps
curl.exe http://localhost:8085
```

![Active containers with mapped ports](assets/screenshots/unit-1/04-docker-ps.svg)
*Active containers showing port mapping — Docker Desktop on Windows*


![Apache HTTP response output](assets/screenshots/unit-1/05-curl-apache.svg)
*HTTP response from the Apache server — Docker Desktop on Windows*


**Step 4 — Check port binding details:**
```powershell
docker inspect httpd-server --format "{{.NetworkSettings.Ports}}"
```

**Step 5 — Remove the container:**
```powershell
docker stop httpd-server
docker rm httpd-server
```

---

## LAB EXERCISE 2 — Serving Custom HTML via Apache

```powershell
docker run -d --name html-server -p 8088:80 httpd:alpine
docker exec html-server sh -c "echo '<h1>DEVOPS STUDENT — LEARNING DOCKER</h1>' > /usr/local/apache2/htdocs/index.html"
curl.exe http://localhost:8088
docker stop html-server; docker rm html-server
```

Open **http://localhost:8088** in your browser (Edge or Chrome) on Windows.

---

## REVIEW QUESTIONS

1. How does a container image differ from a running container instance?
2. Describe the role of namespaces in achieving process isolation.
3. In what way do cgroups contribute to managing container resources?
4. List the four primary Docker object types and their purposes.
5. What advantages does a layered filesystem provide in Docker?

**Answers:**
1. An image is a static, read-only template, while a container is its live, running instance with an added writable layer.
2. Namespaces partition system resources (PIDs, network, mounts, etc.) so each container has its own isolated view.
3. cgroups set hard limits on CPU, memory, and I/O usage for each container.
4. Image (blueprint), Container (running instance), Network (connectivity), Volume (persistent storage).
5. Caching layers accelerates builds; sharing common layers conserves disk space; CoW makes container creation efficient.
