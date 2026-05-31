# Deploy Jenkins LTS using Docker Desktop on Windows
# PowerShell commands:
#   docker volume create jenkins_data
#   docker run -d -p 8089:8080 -p 50001:50000 -v jenkins_data:/var/jenkins_home --name jenkins-server jenkins/jenkins:lts
#
# Retrieve the initial admin password:
#   docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
#
# Access: http://localhost:8089

FROM jenkins/jenkins:lts
USER root
RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*
USER jenkins
