# UNIT I (continued): DOCKER INTERNALS & OBJECT MANAGEMENT
## WEEK 2: Runtime Stack, CLI Usage, Registry Operations & Filesystem Details

---

### A. Container Runtime Stack (OCI Standards)
The **Open Container Initiative (OCI)** establishes industry standards for how container images are formatted and how runtimes execute them.

- **High-level runtime** — containerd, CRI-O
- **Low-level runtime** — runc, crun
- **Orchestration layer** — Kubernetes, Docker Compose

---

### B. Essential Docker CLI Commands (Windows PowerShell)

```powershell
docker version          # Shows client and server version info
docker info             # Daemon configuration, storage driver, CPU count
docker help run         # Detailed help for the run command
```

**Listing Docker objects:**
```powershell
docker images           # Show all local images
docker ps               # Show running containers
docker ps -a            # Include stopped containers
docker network ls       # Display all networks
docker volume ls        # Display all volumes
```

---

### C. Container Lifecycle Management

```powershell
docker run -d --name web-container -p 8090:80 nginx:alpine   # Create and start
docker stop web-container                                       # Graceful shutdown
docker start web-container                                      # Resume a stopped container
docker restart web-container                                    # Restart (stop + start)
docker pause web-container                                      # Suspend all processes
docker unpause web-container
docker rm -f web-container                                      # Forcefully remove
```

---

### D. Transferring Files Between Container & Host (Windows paths)

```powershell
docker run -d --name copy-demo nginx:alpine
docker exec copy-demo sh -c "echo 'DevOps Notes' > /tmp/notes.txt"
docker cp copy-demo:/tmp/notes.txt "$env:USERPROFILE\Desktop\notes.txt"
docker rm -f copy-demo
```

> **Windows note:** Reference `$env:USERPROFILE\Desktop` rather than Linux-style paths like `/home/user/Desktop`.

---

### E. Working with Docker Registries & Docker Hub

**Typical workflow:** Build → Tag → Push → Pull

```powershell
docker tag httpd:alpine yourusername/my-httpd:1.0
docker login
docker push yourusername/my-httpd:1.0
docker pull yourusername/my-httpd:1.0
```

**Image naming convention:** `registry/namespace/repository:tag`
- `nginx:alpine` → defaults to Docker Hub, library namespace
- `ghcr.io/user/app:v1` → GitHub Container Registry

---

### F. Image Layers — In-Depth Look

When pulling an image, Docker only downloads layers that are not already present locally. Use these commands to inspect:
```powershell
docker image inspect httpd:alpine --format "{{.RootFS.Layers}}"
docker history httpd:alpine
```

**Why layers matter:**
- Unchanged layers are cached, making builds faster
- Common base layers are shared across images, saving disk space
- Only missing layers are transferred during pulls, speeding up deployments

---

### G. Copy-on-Write (CoW) Strategy
When a container needs to modify a file that lives in a read-only image layer:
1. The file gets copied up to the writable container layer
2. The modification is applied to this copy
3. The original layer remains untouched

This is why containers are considered ephemeral — removing a container erases its writable layer and any unsaved data.

---

### H. Docker Desktop Architecture on Windows

```
Windows Host
  └── Docker Desktop
        └── WSL2 Linux VM (dockerd executes here)
              └── Linux-based containers
```

To enable the WSL2 backend: Docker Desktop → Settings → General.

---

## LAB EXERCISE — Working with Docker Objects

```powershell
# Pull an image
docker pull redis:alpine
docker images redis

# Start a container with an environment variable
docker run -d --name cache-instance -e REDIS_SECRET=pass123 redis:alpine

# View container logs
docker logs cache-instance

# Open a shell inside the container
docker exec -it cache-instance sh

# Tear down
docker rm -f cache-instance
```

---

## REVIEW QUESTIONS

1. What is the OCI and what problem does it solve?
2. How does `docker stop` differ from `docker kill` in terms of signal handling?
3. Describe the Docker Hub image tagging convention with an example.
4. What is the fate of data in the writable layer once a container is deleted?
5. Why does Docker Desktop on Windows rely on WSL2?

**Answers:**
1. The OCI defines open standards for container image formats and runtimes, ensuring tools from different vendors can interoperate.
2. `stop` issues SIGTERM allowing graceful shutdown; `kill` sends SIGKILL for immediate termination.
3. Format: `[registry/]namespace/repo:tag` — when registry and namespace are omitted, Docker Hub and the library namespace are assumed.
4. The writable layer is destroyed along with the container — all data not stored in volumes is permanently lost.
5. Linux containers require a Linux kernel; WSL2 provides a real Linux kernel within Windows without the overhead of a full VM.
