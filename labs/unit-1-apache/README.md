# Part I Lab — Apache httpd Deployment on Windows
# Execute from the repository root:

docker pull httpd:alpine
docker run -d --name httpd-server -p 8085:80 httpd:alpine
docker ps
curl.exe http://localhost:8085

# Serve custom HTML page:
docker exec httpd-server sh -c "echo '<h1>EXPLORING DOCKER CONTAINERS</h1>' > /usr/local/apache2/htdocs/index.html"

# Teardown:
docker stop httpd-server && docker rm httpd-server
