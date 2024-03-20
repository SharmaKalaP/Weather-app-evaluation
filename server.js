const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const apiKey = '615d9c8493560e90013456b6826eccd5'; // Replace with your actual API key

// Middleware to parse JSON bodies
app.use(express.json());

// Route to fetch weather data
app.get('/weather', async (req, res) => {
  try {
    const { location, lat, lon } = req.query;
    let apiUrl = '';
    
    if (location) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    } else if (lat && lon) {
      apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    } else {
      return res.status(400).json({ message: 'Missing location or coordinates' });
    }

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
