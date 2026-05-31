UNIT VI: CI/CD USING JENKINS
WEEK 16: PIPELINE SYNTAX & JENKINSFILE CONFIGURATION

Section A — DECLARATIVE VS SCRIPTED PIPELINE
A Jenkins Pipeline is a collection of plugins that enables continuous delivery workflows.
Two Groovy-based syntaxes exist:
- Declarative Pipeline: The recommended modern syntax. It enforces a rigid, organized structure using blocks such as `pipeline`, `stages`, `steps`, and `post`. This approach is simpler to read and validate.
- Scripted Pipeline: The older syntax. Essentially raw Groovy code executed within Jenkins. It provides extreme flexibility and complex control flow (conditionals, loops), but can quickly become difficult to maintain.

Section B — ANATOMY OF A DECLARATIVE JENKINSFILE
A Jenkinsfile is typically stored in the root directory of the Git repository.
Essential blocks include:
- `pipeline`: The top-level wrapper element.
- `agent`: Specifies WHERE execution happens (e.g., `agent any`, `agent { label 'linux' }`).
- `stages`: A container holding one or more `stage` directives in sequence.
- `stage`: Represents a distinct phase of the pipeline (e.g., "Build", "Test").
- `steps`: The concrete tasks performed within a stage (e.g., shell commands via `sh`).
- `post`: Actions executed after the pipeline finishes, conditioned on the outcome (e.g., `success`, `failure`, `always`).

Section C — PARAMETERS AND ENVIRONMENT VARIABLES
Pipelines support parameterization, allowing users to provide dynamic inputs when clicking "Build with Parameters" in the Jenkins UI.
Environment variables are declared in the `environment` block and referenced using \`${env.VAR_NAME}\`.

Section D — MULTI-BRANCH PIPELINE PROJECTS
A Multi-branch Pipeline automatically scans a Git repository. For every branch or Pull Request containing a `Jenkinsfile`, Jenkins creates a corresponding pipeline job automatically. This is critical for teams following GitFlow or trunk-based development.

Section E — PRESERVING BUILD ARTIFACTS
Compiled output files (JAR archives, ZIP packages, test reports) are temporary and disappear when the workspace is cleaned. The `archiveArtifacts` step copies selected files to persistent storage on the Jenkins controller, making them available for download from the build results page.

=======================================================
LAB EXERCISES — WEEK 16
=======================================================

### Lab Exercise 3: Creating a Declarative Pipeline
**Scenario:**
Write a `Jenkinsfile` using Declarative syntax. It should execute on any available agent. Define two stages: "Build" (executing `make build`) and "Test" (executing `make test`). Include a post block that prints "Pipeline finished" regardless of the build outcome.

**Code:**
```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                echo 'Running compilation step...'
                sh 'make build'
            }
        }
        stage('Test') {
            steps {
                echo 'Running test suite...'
                sh 'make test'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}
```

### Lab Exercise 4: Archiving Build Output
**Scenario:**
Your Jenkins pipeline's "Build" stage generates a file called `release-bundle.zip` inside the `target/` directory. Add a step to archive this output so it is accessible on the Jenkins build results dashboard.

**Code:**
```groovy
pipeline {
    agent any
    stages {
        stage('Build and Archive') {
            steps {
                sh 'mkdir -p target && touch target/release-bundle.zip'
                
                // Persist the build output to Jenkins storage
                archiveArtifacts artifacts: 'target/*.zip', fingerprint: true
            }
        }
    }
}
```
*Note:* The `archiveArtifacts` step transfers files matching the glob pattern from the temporary agent workspace to permanent storage on the Jenkins controller. Setting `fingerprint: true` enables artifact tracking across different pipeline runs.
### Windows Lab — Pipeline configuration
Create a Jenkinsfile containing Checkout, Build, Test, and Package stages.

