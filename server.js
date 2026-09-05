const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Import routes
const promptRoutes = require('./routes/prompts');
const videoRoutes = require('./routes/videos');
const projectRoutes = require('./routes/projects');

// Routes
app.use('/api/prompts', promptRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong', details: err.message });
});

app.listen(PORT, () => {
  console.log(`🎬 Short-Form Video Generator running on http://localhost:${PORT}`);
});
