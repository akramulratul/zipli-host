const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// API Routes
app.post('/users', (req, res) => {
  // Your existing user authentication logic
  const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'fakeapi', 'json_responses', 'user.json')));
  res.json(json);
});

app.get('/climateimpactbysite/:siteId', (req, res) => {
  const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'fakeapi', 'json_responses', 'april.json')));
  res.json(json);
});

app.get('/climateimpactbyuser/:userId', (req, res) => {
  const starts = new Date(req.query.startDate);
  const ends = new Date(req.query.endDate);
  const startMonth = starts.getMonth() + 1;
  const endMonth = ends.getMonth() + 1;

  let fileName = '';

  if (startMonth === 1 && endMonth === 12) {
    fileName = 'current-year.json';
  } else {
    fileName = 'april.json';
  }

  const json = JSON.parse(fs.readFileSync(path.join(__dirname, 'fakeapi', 'json_responses', fileName)));
  res.json(json);
});

// Handle React routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 