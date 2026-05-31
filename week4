# UNIT II (continued): NETWORKING & PERSISTENT STORAGE IN DOCKER
## WEEK 4: Network Drivers, Volumes, Port Forwarding & Copy-on-Write

---

### A. Docker Networking Fundamentals
By default, containers run in isolation. Docker networking allows them to communicate with each other and the outside world.

- **bridge** — Default driver; suitable for containers on the same host
- **host** — Container shares the host's network stack directly
- **overlay** — Enables communication across multiple hosts (used with Swarm/Kubernetes)
- **none** — Completely disables networking

---

### B. Custom Bridge Networks & Port Forwarding

```powershell
docker network create lab-network
docker network ls
docker network inspect lab-network
```

![Custom bridge network creation output](assets/screenshots/unit-2/06-network-create.svg)
*Bridge network created successfully — Docker Desktop on Windows*


![Network listing showing custom network](assets/screenshots/unit-2/07-network-ls.svg)
*All Docker networks listed — Docker Desktop on Windows*


![Detailed network inspection output](assets/screenshots/unit-2/08-network-inspect.svg)
*Inspecting the custom network details — Docker Desktop on Windows*


**Port forwarding** uses the syntax `-p host:container`:
```powershell
docker run -d -p 8088:80 --name web --network lab-network nginx:alpine
```

Open in your Windows browser: `http://localhost:8088`

---

### C. Container DNS Resolution
On **user-defined bridge networks**, containers can reach each other using **container names** as hostnames:
```powershell
docker run -d --name db --network lab-network mysql:8.0
docker run -d --name api --network lab-network my-api
# The api container connects to "db" by name — no IP address needed
```

The default `bridge` network does **not** provide DNS-based name resolution between containers.

---

### D. Container Linking (Deprecated)
The `--link` flag is a legacy feature. Always prefer **user-defined networks** for inter-container communication.

---

### E. Storage Options: Volumes vs Bind Mounts

- **Volume** — Managed by Docker; ideal for production data such as databases and uploads
- **Bind mount** — Maps a host directory; best for development hot-reload and configuration files
- **tmpfs** — Stored in memory only; suitable for sensitive temporary data

```powershell
docker volume create data-vol
docker volume ls
docker run -d -v data-vol:/data --name storage-test alpine sleep 3600
docker exec storage-test sh -c "echo hello > /data/test.txt"
docker rm -f storage-test
docker run --rm -v data-vol:/data alpine cat /data/test.txt
```

![Named volume creation output](assets/screenshots/unit-2/09-volume-create.svg)
*Docker volume created — Docker Desktop on Windows*


![Volume listing output](assets/screenshots/unit-2/10-volume-ls.svg)
*All Docker volumes displayed — Docker Desktop on Windows*


**Using a bind mount on Windows:**
```powershell
docker run -d -v ${env:USERPROFILE}/devops-data:/data nginx:alpine
```

---

### F. Copy-on-Write in Practice
Image layers remain read-only. The container adds a writable CoW layer on top.
- **Benefit:** Container startup is almost instant because the base image is shared
- **Caution:** Excessive writes bloat the container layer — use volumes for persistent or large data

---

### G. Container Lifecycle Walkthrough

```powershell
docker run -d --name lifecycle-demo nginx:alpine
docker pause lifecycle-demo
docker unpause lifecycle-demo
docker stop lifecycle-demo
docker start lifecycle-demo
docker restart lifecycle-demo
docker rm lifecycle-demo
```

---

## LAB EXERCISE — Multi-Container Networking

```powershell
docker network create test-net
docker run -d --name redis --network test-net redis:alpine
docker run -it --rm --network test-net alpine ping -c 3 redis
docker network rm test-net
docker rm -f redis
```

---

## REVIEW QUESTIONS

1. How does the bridge network driver differ from the host driver?
2. On Windows, when should you choose volumes over bind mounts?
3. Explain how DNS-based discovery works within user-defined bridge networks.
4. Describe the Copy-on-Write mechanism and its purpose.
5. Write the Docker flag to forward host port 9090 to container port 80.
