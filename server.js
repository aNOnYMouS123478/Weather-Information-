const express = require('express');
const http = require('http');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;
const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;

if (!openWeatherMapApiKey) {
    console.error('Error: Missing OPENWEATHERMAP_API_KEY in .env file');
    process.exit(1);
}

// Serve static files
app.use(express.static(path.join(__dirname)));

// API route to get weather data
app.get('/weather', (req, res) => {
    const location = req.query.location;
    if (!location) {
        return res.status(400).send({ error: 'You must provide a location' });
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${openWeatherMapApiKey}&units=metric`;

    http.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const weatherData = JSON.parse(data);
            console.log(weatherData); // Log the API response
            if (weatherData.cod !== 200) {
                res.status(500).send({ error: weatherData.message });
            } else {
                res.send(weatherData);
            }
        });
    }).on('error', (error) => {
        res.status(500).send({ error: 'Unable to fetch weather data' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
