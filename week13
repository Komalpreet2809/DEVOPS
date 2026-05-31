UNIT V: CI USING GITHUB ACTIONS
WEEK 13: MATRIX BUILDS, STEP EXECUTION & DEPENDENCY CACHING

Section A — MATRIX BUILD STRATEGIES
A matrix strategy allows you to define variables within a single job configuration, and GitHub Actions will automatically generate multiple parallel job runs for every combination of those variables.
For instance, when maintaining an open-source library, you might need to verify compatibility across Node versions 14, 16, and 18 on both Ubuntu and Windows runners. A matrix configuration will automatically create 6 concurrent jobs covering all combinations.

Section B — STEP EXECUTION & SHELL SCRIPTS
Within a Job, Steps run one after another in sequence. The `run` keyword lets you invoke native shell commands.
For multi-line scripts, use the pipe `|` operator:
```yaml
- run: |
    echo "Initiating build sequence"
    make build
    make test
```

Section C — LEVERAGING MARKETPLACE ACTIONS
There is no need to build everything yourself. The GitHub Marketplace hosts thousands of ready-made actions.
- Security Scanning: Tools like SonarQube or Snyk can be integrated to automatically detect code vulnerabilities.
- Language Environments: `actions/setup-python`, `actions/setup-java` handle environment PATH configuration automatically.
- Cloud Credentials: Actions such as `aws-actions/configure-aws-credentials` securely inject IAM roles into the runner context.

Section D — DEPENDENCY CACHING FOR FASTER PIPELINES
Re-downloading dependencies (`node_modules`, `~/.m2`) every run wastes significant compute time. The `actions/cache` action persists these directories across workflow runs.
The cache key is derived from a hash of your lock file (e.g., `package-lock.json`). When the lock file remains unchanged, the cached dependency folder is restored in seconds rather than downloading everything again.

Section E — ORCHESTRATING MULTI-JOB WORKFLOWS
All jobs within a workflow execute in parallel by default.
To enforce sequential execution (e.g., Build → Test → Deploy), apply the `needs` keyword:
```yaml
jobs:
  test:
    ...
  deploy:
    needs: test
    ...
```
Here the `deploy` job waits until `test` completes successfully before starting.

=======================================================
LAB EXERCISES — WEEK 13
=======================================================

### Lab Exercise 3: Matrix Strategy for Cross-Version Testing
**Scenario:**
Create a workflow job that validates a Python application against three Python versions (3.8, 3.9, 3.10) using the matrix strategy feature.

**Code:**
```yaml
jobs:
  cross-version-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        python-version: ["3.8", "3.9", "3.10"]
    steps:
      - uses: actions/checkout@v3
      - name: Configure Python ${{ matrix.python-version }}
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      - name: Install and run tests
        run: |
          pip install pytest
          pytest tests/
```
*Note:* GitHub dynamically provisions 3 separate runners. The expression `${{ matrix.python-version }}` substitutes the value for the current matrix iteration.

### Lab Exercise 4: Caching Maven Repository
**Scenario:**
Your Maven build spends 5 minutes downloading JAR dependencies. Implement a caching step that stores the `~/.m2/repository` folder. Use a cache key derived from the runner OS and a hash of the `pom.xml` file.

**Code:**
```yaml
steps:
  - uses: actions/checkout@v3
  
  - name: Restore Maven cache
    uses: actions/cache@v3
    with:
      path: ~/.m2/repository
      key: ${{ runner.os }}-maven-${{ hashFiles('**/pom.xml') }}
      restore-keys: |
        ${{ runner.os }}-maven-
        
  - name: Execute Maven build
    run: mvn -B package --file pom.xml
```
*Note:* The function `hashFiles('**/pom.xml')` produces a unique string from the POM contents. Adding a new dependency alters the POM hash, triggering a cache miss and a fresh download.
### Windows Lab — Matrix configuration
Include `strategy.matrix` with Java versions 17 and 21 in your workflow YAML file.

