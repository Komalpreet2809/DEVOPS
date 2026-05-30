# Run Jenkins LTS on Windows (Docker Desktop required)
# PowerShell:
#   docker volume create jenkins_home
#   docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins-lab jenkins/jenkins:lts
#
# Get initial admin password:
#   docker exec jenkins-lab cat /var/jenkins_home/secrets/initialAdminPassword
#
# Open: http://localhost:8080

FROM jenkins/jenkins:lts
USER root
RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*
USER jenkins
