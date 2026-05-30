const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'AMAN IS LEARNING DOCKER',
    service: process.env.APP_NAME || 'DevOps Lab',
    platform: 'Windows + Docker Desktop'
  });
});

app.listen(port, () => console.log(`Server on port ${port}`));
