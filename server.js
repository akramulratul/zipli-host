const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: '*', // In production, replace with your actual frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Helper function to read JSON files
const readJsonFile = (filename) => {
  try {
    const filePath = path.join(__dirname, 'fakeapi', 'json_responses', filename);
    console.log('Reading file from:', filePath); // Debug log
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    throw error;
  }
};

// API Routes
app.post('/users', (req, res) => {
  try {
    const json = readJsonFile('user.json');
    res.json(json);
  } catch (error) {
    console.error('Error reading user.json:', error);
    res.status(500).json({ error: 'Failed to read user data' });
  }
});

app.get('/climateimpactbysite/:siteId', (req, res) => {
  try {
    const json = readJsonFile('april.json');
    res.json(json);
  } catch (error) {
    console.error('Error reading climate impact data:', error);
    res.status(500).json({ error: 'Failed to read climate impact data' });
  }
});

app.get('/climateimpactbyuser/:userId', (req, res) => {
  try {
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

    const json = readJsonFile(fileName);
    res.json(json);
  } catch (error) {
    console.error('Error reading climate impact data:', error);
    res.status(500).json({ error: 'Failed to read climate impact data' });
  }
});

// Handle React routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Debug endpoint to check available JSON files
app.get('/debug/files', (req, res) => {
  try {
    const jsonDir = path.join(__dirname, 'fakeapi', 'json_responses');
    const files = fs.readdirSync(jsonDir);
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to read directory', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Log the current directory and available JSON files
  console.log('Current directory:', __dirname);
  try {
    const jsonDir = path.join(__dirname, 'fakeapi', 'json_responses');
    const files = fs.readdirSync(jsonDir);
    console.log('Available JSON files:', files);
  } catch (error) {
    console.error('Error reading JSON directory:', error);
  }
}); 