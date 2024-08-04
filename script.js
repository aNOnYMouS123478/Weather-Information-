document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('location').value;
    const weatherResult = document.getElementById('weatherResult');

    try {
        const response = await fetch(`/weather?location=${location}`);
        const data = await response.json();

       

        if (data.error) {
            weatherResult.innerHTML = `<p>${data.error}</p>`;
        } else {
            const { name, sys, main, weather, wind } = data;
            weatherResult.innerHTML = `
                <h2>${name}, ${sys.country}</h2>
                <p>Temperature: ${main.temp}°C</p>
                <p>Weather: ${weather[0].description}</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
                <p>Humidity: ${main.humidity}%</p>
            `;
        }
    } catch (error) {
        weatherResult.innerHTML = `<p>Unable to fetch weather data</p>`;
    }
});
