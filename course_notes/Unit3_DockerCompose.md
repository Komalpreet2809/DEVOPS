UNIT III: CONTAINERIZED MICROSERVICES USING DOCKER COMPOSE
WEEK 7: COMPOSE FILE STRUCTURE AND CONFIGURATION

Topic A. WHAT IS DOCKER COMPOSE?
Running individual containers with the Docker CLI is fine for simple tasks, but production microservice stacks typically involve multiple interdependent containers — such as a frontend, an API server, and a data store.
Docker Compose solves this by letting you describe your entire multi-container application in a single YAML configuration file. One command then brings everything up together.

Topic B. UNDERSTANDING YAML SYNTAX
YAML (YAML Ain't Markup Language) is a format designed to be easy for humans to read and write.
Essential rules to remember:
- Hierarchy is expressed through indentation using spaces — tabs are strictly forbidden.
- Data is represented as key-value pairs separated by a colon and a space.
- Sequences (lists) are indicated with a leading hyphen (-).
- Even minor formatting mistakes can cause parsing errors.

Topic C. ANATOMY OF A docker-compose.yml FILE
A typical Compose configuration file is organized around four primary top-level sections:
- `version`: Specifies which version of the Compose file schema you are using (e.g., '3.8'), which determines available features.
- `services`: The most important section — this is where each container (microservice) in your stack is defined.
- `networks`: Allows you to create isolated virtual networks so that only certain containers can communicate with each other.
- `volumes`: Declares named volumes for persistent data storage, ensuring information survives container restarts and removals.

Topic D. CHOOSING BETWEEN BUILD AND IMAGE
When defining a service, you must tell Compose how to obtain the container image:
- `image`: Pulls a ready-made image from a registry such as Docker Hub (e.g., `image: postgres:13`).
- `build`: Instructs Compose to construct the image locally from a Dockerfile. You provide the `context` path pointing to the directory that contains the Dockerfile.

Topic E. CONFIGURING WITH ENVIRONMENT VARIABLES
According to the Twelve-Factor App principles, configuration that changes between environments (like database credentials or external API URLs) should be injected through environment variables rather than hardcoded.
Docker Compose supports this via the `environment` key (inline definitions) or by referencing an external file with the `env_file` directive.

Topic F. MANAGING SENSITIVE DATA
For production secrets — such as database master passwords or SSL certificates — plain environment variables are insufficient. Docker Compose offers a `secrets` mechanism that mounts sensitive data into the container filesystem at runtime in a controlled manner.

=======================================================
LAB EXERCISES — WEEK 7
=======================================================

### Lab Exercise 3: Composing a Multi-Container Application
**Task Description:**
Write a `docker-compose.yml` that declares two services: a Redis caching layer using the official `redis:alpine` image, and a frontend application built from a local `./frontend` directory. The frontend should be accessible on host port 5005 mapped to container port 5005.

**Answer:**
```yaml
version: '3.8'

services:
  redis-cache:
    image: redis:alpine
    restart: always

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5005:5005"
    depends_on:
      - redis-cache
```
*How it works:* The `redis-cache` service uses a pre-built lightweight image, while `frontend` is compiled from local source. The `depends_on` directive ensures the cache container is started before the frontend attempts to connect to it.

### Lab Exercise 4: Injecting Configuration via .env Files
**Task Description:**
A PostgreSQL container needs database credentials passed at startup. Create a `.env` file with the credentials and write the corresponding Compose configuration that loads these values dynamically.

**Answer:**

**`.env`**
```env
PG_USER=devops_admin
PG_SECRET=Str0ngP@ssw0rd!
PG_DATABASE=app_store
```

**`docker-compose.yml`**
```yaml
version: '3.8'

services:
  datastore:
    image: postgres:14-alpine
    env_file:
      - .env
    environment:
      POSTGRES_USER: ${PG_USER}
      POSTGRES_PASSWORD: ${PG_SECRET}
      POSTGRES_DB: ${PG_DATABASE}
    volumes:
      - pg_storage:/var/lib/postgresql/data

volumes:
  pg_storage:
```
*How it works:* The `env_file` key reads variables from the `.env` file. The `${VAR}` interpolation syntax substitutes those values directly into the container's runtime environment.
---

## WINDOWS LAB ENVIRONMENT

**Requirements:** Docker Desktop must be running with WSL2 backend enabled.

```powershell
# Verify Docker is operational
docker info
docker compose version
```

### Windows Lab — Multi-container stack
```powershell
cd labs\lab3-compose-stack
docker compose config
docker compose up -d
```

