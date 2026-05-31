# UNIT II (continued): CONTAINER NETWORKING & DATA PERSISTENCE
## WEEK 4: Network Types, Volume Management, Port Binding & CoW

---

### Topic 1. Networking in Docker — Overview
Containers are network-isolated by default. Docker provides several network drivers to control how containers communicate.

| Driver | Description |
|--------|-------------|
| **bridge** | Default mode — connects containers running on the same host |
| **host** | Removes network isolation; container uses the host's network directly |
| **overlay** | Spans multiple Docker hosts (Swarm or Kubernetes) |
| **none** | No network connectivity at all |

---

### Topic 2. Setting Up a Bridge Network & Exposing Ports

```powershell
docker network create custom-net
docker network ls
docker network inspect custom-net
```

![Bridge network successfully created](assets/screenshots/unit-2/06-network-create.svg)
*New custom bridge network — Docker Desktop on Windows*


![Docker network list output](assets/screenshots/unit-2/07-network-ls.svg)
*Available Docker networks — Docker Desktop on Windows*


![Network inspection details](assets/screenshots/unit-2/08-network-inspect.svg)
*Details of the custom network — Docker Desktop on Windows*


**Exposing ports** with `-p host_port:container_port`:
```powershell
docker run -d -p 8088:80 --name web-srv --network custom-net nginx:alpine
```

Visit in your browser on Windows: `http://localhost:8088`

---

### Topic 3. DNS-Based Service Discovery
Containers on **user-defined bridge networks** can resolve each other by **name** instead of IP:
```powershell
docker run -d --name database --network custom-net mysql:8.0
docker run -d --name backend --network custom-net my-api
# backend connects to hostname "database" automatically
```

Note: The built-in `bridge` network lacks container name DNS resolution.

---

### Topic 4. Legacy Container Linking
The `--link` option is deprecated. The recommended approach is to use **custom user-defined networks**.

---

### Topic 5. Volumes, Bind Mounts & tmpfs

| Storage Type | Managed By | Recommended For |
|-------------|-----------|-----------------|
| **Volume** | Docker engine | Database files, application uploads |
| **Bind mount** | User-specified path | Development workflows, config injection |
| **tmpfs** | System memory | Ephemeral sensitive data |

```powershell
docker volume create app-data
docker volume ls
docker run -d -v app-data:/data --name data-container alpine sleep 3600
docker exec data-container sh -c "echo hello > /data/test.txt"
docker rm -f data-container
docker run --rm -v app-data:/data alpine cat /data/test.txt
```

![Volume creation confirmation](assets/screenshots/unit-2/09-volume-create.svg)
*Named Docker volume created — Docker Desktop on Windows*


![Volume listing in PowerShell](assets/screenshots/unit-2/10-volume-ls.svg)
*Listing all available Docker volumes — Docker Desktop on Windows*


**Bind mount example (Windows):**
```powershell
docker run -d -v ${env:USERPROFILE}/devops-data:/data nginx:alpine
```

---

### Topic 6. Understanding Copy-on-Write
All image layers are immutable (read-only). Containers add a writable CoW overlay on top.
- **Upside:** Containers start instantly since they share the underlying image
- **Downside:** Frequent writes consume container layer space — always use volumes for large or persistent data

---

### Topic 7. Practicing the Container Lifecycle

```powershell
docker run -d --name lifecycle-test nginx:alpine
docker pause lifecycle-test
docker unpause lifecycle-test
docker stop lifecycle-test
docker start lifecycle-test
docker restart lifecycle-test
docker rm lifecycle-test
```

---

## LAB EXERCISE — Connecting Two Containers via Network

```powershell
docker network create demo-net
docker run -d --name redis --network demo-net redis:alpine
docker run -it --rm --network demo-net alpine ping -c 3 redis
docker network rm demo-net
docker rm -f redis
```

---

## REVIEW QUESTIONS

1. Compare and contrast the bridge and host network drivers.
2. In a Windows environment, when are volumes preferable to bind mounts?
3. How does DNS resolution function within custom bridge networks?
4. What is the Copy-on-Write mechanism and why is it important?
5. Provide the Docker flag needed to map host port 9090 to container port 80.
