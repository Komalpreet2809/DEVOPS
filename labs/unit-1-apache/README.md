# Unit I Lab — Apache httpd on Windows
# Run from repo root:

docker pull httpd:alpine
docker run -d --name apache-lab -p 8081:80 httpd:alpine
docker ps
curl.exe http://localhost:8081

# Custom HTML:
docker exec apache-lab sh -c "echo '<h1>AMAN IS LEARNING DOCKER</h1>' > /usr/local/apache2/htdocs/index.html"

# Cleanup:
docker stop apache-lab && docker rm apache-lab
