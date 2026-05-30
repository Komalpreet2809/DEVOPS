const fs = require('fs');
const path = require('path');

const repo = path.join(__dirname, '..');
const img = (unit, file, cap) =>
  `\n![${cap}](assets/screenshots/${unit}/${file}.svg)\n*${cap} — captured on Windows PowerShell + Docker Desktop*\n`;

const win = `
---

## WINDOWS PRACTICAL SETUP

**Prerequisites:** Docker Desktop running, WSL2 enabled.

\`\`\`powershell
docker info
docker compose version
\`\`\`
`;

const enhancements = {
  week6: win + `\n### Windows Lab — Run inventory microservice\n\`\`\`powershell\ncd labs\\unit-2-dockerfile\ndocker build -t inventory-svc:1.0 .\ndocker run -d --name inventory -p 8081:3000 inventory-svc:1.0\ncurl.exe http://localhost:8081\n\`\`\`\n`,
  week7: win + `\n### Windows Lab — Multi-service Compose\n\`\`\`powershell\ncd labs\\unit-3-wordpress\ndocker compose config\ndocker compose up -d\n\`\`\`\n`,
  week8: `\n### Windows Lab — WordPress + MySQL\n\`\`\`powershell\ncd labs\\unit-3-wordpress\ndocker compose up -d\ndocker compose ps\n# Open http://localhost:8000\n\`\`\`\n` + img('unit-3', '01-compose-up', 'docker compose up on Windows') + img('unit-3', '02-compose-ps', 'Compose services running') + img('unit-3', '03-compose-logs', 'Database container logs'),
  week9: win + `\n### Windows Lab — Maven project\n\`\`\`powershell\ncd labs\\unit-4-maven\nmvn -B clean verify\njava -jar target\\calculator-app-1.0.0-SNAPSHOT.jar\n\`\`\`\n` + img('unit-4', '01-mvn-version', 'Maven version on Windows') + img('unit-4', '02-mvn-clean-verify', 'Maven clean verify build'),
  week10: img('unit-4', '03-mvn-dependency-tree', 'Maven dependency tree') + `\n\`\`\`powershell\ncd labs\\unit-4-maven\nmvn dependency:tree\n\`\`\`\n`,
  week11: `\n### Windows Lab — Dockerize Maven app\n\`\`\`powershell\ncd labs\\unit-4-maven\nmvn -B clean package\n# Add Dockerfile with JRE base + COPY target/*.jar\n\`\`\`\n`,
  week12: `\n### Windows Lab — GitHub Actions\nCopy \`labs/unit-5-github-actions/.github/workflows/java-ci.yml\` to your repo and push.\n`,
  week13: `\n### Windows Lab — Matrix build\nAdd \`strategy.matrix\` with Java 17 and 21 in workflow YAML.\n`,
  week14: `\n### Windows Lab — Docker in CI\nAdd a \`docker build\` step tagged with \`\${{ github.sha }}\` in your workflow.\n`,
  week15: `\n### Windows Lab — Jenkins in Docker\n\`\`\`powershell\ndocker volume create jenkins_home\ndocker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins-lab jenkins/jenkins:lts\ndocker exec jenkins-lab cat /var/jenkins_home/secrets/initialAdminPassword\n\`\`\`\n`,
  week16: `\n### Windows Lab — Jenkinsfile\nCreate Jenkinsfile with Checkout, Build, Test, Package stages.\n`,
  week17: `\n### Windows Lab — Jenkins + Maven + Docker pipeline\nConfigure Maven/Docker in Jenkins Global Tool Configuration.\n`,
};

for (const [w, extra] of Object.entries(enhancements)) {
  const restorePath = path.join(repo, `${w}.restore`);
  const base = fs.readFileSync(restorePath, 'utf8').replace(/^\uFEFF/, '').trim();
  fs.writeFileSync(path.join(repo, w), base + extra + '\n');
  console.log('Fixed', w);
}
