const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.json({
    message: 'EXPLORING DOCKER CONTAINERS',
    service: process.env.APP_NAME || 'Container Lab',
    platform: 'Windows + Docker Desktop'
  });
});

app.listen(port, () => console.log(`App running on port ${port}`));
