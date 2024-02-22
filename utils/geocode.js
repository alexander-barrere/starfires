const axios = require('axios');

async function geocode(city, state, country) {
    const apiKey = "89d5a7e1287b40b9b8418e3e7775e054"; // Use your OpenCageData API key
    const query = encodeURIComponent(`${city}, ${state}, ${country}`);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const results = response.data.results;

        if (results.length > 0) {
            const { lat, lng } = results[0].geometry;
            return { latitude: lat.toFixed(7), longitude: lng.toFixed(7) };
        } else {
            throw new Error(`No results found for query: ${city}, ${state}, ${country}`);
        }
    } catch (error) {
        console.error("Geocoding error:", error);
        throw error;
    }
}
