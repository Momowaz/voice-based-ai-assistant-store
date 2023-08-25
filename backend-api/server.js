const express = require('express');
const app = express();
const port = 3001; // Choose a port for your backend

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
