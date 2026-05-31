UNIT VI: CI/CD USING JENKINS
WEEK 15: JENKINS FUNDAMENTALS & SYSTEM ARCHITECTURE

Section A — WHAT IS JENKINS?
Jenkins is the most popular open-source automation server available today. With hundreds of plugins, it supports building, deploying, and automating virtually any project. Unlike GitHub Actions, which is a cloud-hosted service, Jenkins requires you to manage your own infrastructure.

Section B — MASTER/AGENT ARCHITECTURE
Jenkins follows a distributed architecture designed for scalability:
- Agent (Worker) Nodes: Machines connected to the controller that perform the actual build execution. Agents can be permanent VMs, physical servers, or dynamically provisioned Docker/Kubernetes pods.
- Master (Controller) Node: The central hub that hosts the web UI, processes HTTP requests, parses job configurations, schedules builds, and monitors agents. Heavy build workloads should NOT run on the master to avoid performance degradation.

Section C — INSTALLING JENKINS & NAVIGATING THE UI
Jenkins is a Java-based application packaged as a `.war` file. You can run it standalone using `java -jar jenkins.war`, deploy it on Tomcat, or launch it inside a Docker container.
The default Classic UI focuses on functionality, while the "Blue Ocean" plugin offers a modern, visual interface for CI pipeline visualization.

Section D — THE PLUGIN ECOSYSTEM
The real strength of Jenkins lies in its extensive plugin ecosystem. A fresh Jenkins installation has limited functionality.
Plugins provide integrations for Git, Maven, Docker, AWS, Slack notifications, Pipeline DSL, and much more.
Plugin management is done through the web UI (`Manage Jenkins -> Manage Plugins`) or via CLI during automated setup.

Section E — SECURITY, AUTHENTICATION & AUTHORIZATION
Since Jenkins executes arbitrary code and stores deployment credentials, security configuration is essential.
- Authentication: Supports internal user databases, LDAP/Active Directory integration, GitHub OAuth, or SAML providers.
- Authorization (RBAC): The Role-Based Strategy plugin allows administrators to control who can view jobs, start builds, or modify system settings.

Section F — FREESTYLE JOBS VS PIPELINE JOBS
- Freestyle Jobs: Set up through web UI forms by clicking options. Simple to get started, but job configurations are not version-controlled and cannot be tracked in Git.
- Pipeline Jobs: Defined in code through a `Jenkinsfile` that lives alongside your application source in Git (Pipeline-as-Code). This is the recommended industry practice.

=======================================================
LAB EXERCISES — WEEK 15
=======================================================

### Lab Exercise 1: Running Jenkins in a Docker Container
**Scenario:**
You want to launch a local Jenkins controller for experimentation without installing Java on your machine. Write a docker command to start the `jenkins/jenkins:lts` image, expose the web interface on port 8089, and persist all data using a volume.

**Code:**
```bash
docker run -d -p 8089:8080 -p 50001:50000 \
  -v jenkins_data:/var/jenkins_home \
  --name jenkins-controller \
  jenkins/jenkins:lts
```
*Note:* Port 8089 on the host maps to port 8080 inside the container for the Web UI. Port 50001 is used for JNLP/TCP agent communication with the controller. The named volume `jenkins_data` ensures all configurations and jobs survive container restarts.

### Lab Exercise 2: Retrieving the Initial Admin Password
**Scenario:**
On first launch, Jenkins requires an auto-generated admin password to unlock the setup wizard. If Jenkins runs inside a Docker container named `jenkins-controller`, how do you obtain this password from the command line?

**Code:**
```bash
docker exec jenkins-controller cat /var/jenkins_home/secrets/initialAdminPassword
```
*Note:* The `docker exec` command runs a process inside the specified container. Here we use `cat` to display the security token file that Jenkins generates during its initial setup.
### Windows Lab — Jenkins Docker Setup
```powershell
# Create a persistent volume for Jenkins data
docker volume create jenkins_data
# Launch Jenkins container with mapped ports
docker run -d -p 8089:8080 -p 50001:50000 -v jenkins_data:/var/jenkins_home --name jenkins-server jenkins/jenkins:lts
# Retrieve the auto-generated admin password
docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
```

