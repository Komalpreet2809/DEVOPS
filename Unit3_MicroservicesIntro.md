UNIT III: CONTAINERIZED MICROSERVICES USING DOCKER COMPOSE
WEEK 6: UNDERSTANDING MICROSERVICES AND THEIR NECESSITY

Topic A. OVERVIEW OF SOFTWARE ARCHITECTURAL PATTERNS
Over the years, the way software is designed and structured has changed considerably. It is essential for anyone practicing DevOps to grasp how applications transitioned from being built as one large unit to being split into independent services.
Historically, all application logic resided within a single deployable artifact. However, modern requirements such as continuous availability, quick release cycles, and elastic scalability have pushed teams toward adopting microservices-based designs.

Topic B. THE MONOLITHIC APPROACH
A monolithic design bundles the entire application into one unified program.
Properties of Monolithic Applications:
- Unified Codebase: The user interface, business rules, and data access logic all live in a single project.
- High Coupling: Individual modules are tightly interwoven, making isolated changes difficult.
- Shared Resources: Every module operates within the same memory and compute environment.

Drawbacks of the Monolithic Model:
- Difficult to Scale Independently: If the payment module needs more capacity, the entire application must be scaled — resulting in wasted resources.
- Long Deployment Cycles: Even a minor bug fix requires rebuilding and redeploying the whole application.
- Large Failure Impact: A single memory leak or exception in one module can crash every part of the system.
- Framework Lock-in: Switching to a newer language or technology stack is extremely challenging when everything is interlinked.

Topic C. THE MICROSERVICES APPROACH
In a microservices design, a large system is decomposed into a collection of small, independently running services, each focusing on a particular business function.
Core Characteristics:
- Loose Coupling: Individual services can be modified, upgraded, or swapped out without disrupting others.
- Independent Deployment: For instance, the authentication service can be redeployed without affecting order management.
- Language Flexibility: Teams are free to pick the best tool for each job — Node.js for API layers, Python for analytics components, Go for high-performance workers, and so on.

Topic D. BENEFITS OF USING MICROSERVICES
- Granular Scalability: Only the services under heavy load need additional instances, leading to significant savings on cloud infrastructure costs.
- Fault Isolation: If one service encounters a failure, the rest of the system continues operating normally.
- Team Autonomy: Small, focused teams can independently own their service throughout its entire lifecycle — from coding to monitoring (a core DevOps principle).
- Accelerated Releases: CI/CD pipelines execute faster since each service has a smaller, more manageable codebase.

Topic E. THE API GATEWAY PATTERN
An API Gateway serves as a unified entry point that sits in front of all backend microservices. It receives incoming requests, applies security and rate-limiting policies, forwards them to the appropriate backend, and returns the aggregated response to the caller.
Why is an API Gateway important?
- Clients interact with a single endpoint instead of tracking multiple service URLs.
- Common concerns such as TLS termination, user authentication, and request logging are handled centrally.
- It minimizes client-side complexity by combining responses from several microservices into one call.

=======================================================
LAB EXERCISES — WEEK 6
=======================================================

### Lab Exercise 1: Setting Up an Nginx Reverse Proxy as a Gateway
**Task Description:**
Imagine you are transitioning from a monolithic application to microservices. You now have a 'catalog' service on port 8085 and a 'delivery' service on port 8086. Create an Nginx config file that routes `/api/catalog` requests to the catalog backend and `/api/delivery` requests to the delivery backend.

**Answer:**
```nginx
# gateway.conf
events {
    worker_connections 1024;
}

http {
    upstream catalog_backend {
        server localhost:8085;
    }

    upstream delivery_backend {
        server localhost:8086;
    }

    server {
        listen 80;
        server_name gateway.local;

        location /api/catalog/ {
            proxy_pass http://catalog_backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /api/delivery/ {
            proxy_pass http://delivery_backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```
*How it works:* The `upstream` blocks define the addresses of backend services. Each `location` directive maps a URL prefix to the corresponding upstream group, effectively acting as a gateway router.

### Lab Exercise 2: Packaging a Basic Microservice into a Container
**Task Description:**
Build a small Node.js Express application that responds with "Catalog Service Active" on the root endpoint. Then create a Dockerfile based on Alpine Linux to containerize it with a minimal image footprint.

**Answer:**

**`server.js`**
```javascript
const express = require('express');
const app = express();
const port = 8085;

app.get('/', (req, res) => {
    res.json({ service: 'Catalog', status: 'Active', version: '1.0' });
});

app.listen(port, () => {
    console.log(`Catalog service started on http://localhost:${port}`);
});
```

**`Dockerfile`**
```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8085
CMD ["node", "server.js"]
```
*How it works:* The `node:18-alpine` base image keeps the container lightweight. `EXPOSE` documents which port the service listens on, and `CMD` tells Docker what process to run when the container starts.
---

## WINDOWS LAB ENVIRONMENT

**Requirements:** Docker Desktop must be running with WSL2 backend enabled.

```powershell
# Verify Docker is operational
docker info
docker compose version
```

### Windows Lab — Launch catalog microservice
```powershell
cd labs\lab2-custom-image
docker build -t catalog-svc:1.0 .
docker run -d --name catalog-demo -p 8085:3002 catalog-svc:1.0
curl.exe http://localhost:8085
```

