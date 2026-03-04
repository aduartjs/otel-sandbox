import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

// Mock weather data
const weatherData: Record<string, { city: string; temperature: number; conditions: string; humidity: number }> = {
    london: { city: 'London', temperature: 12, conditions: 'Cloudy', humidity: 78 },
    paris: { city: 'Paris', temperature: 15, conditions: 'Partly Cloudy', humidity: 65 },
    tokyo: { city: 'Tokyo', temperature: 22, conditions: 'Sunny', humidity: 55 },
    'new york': { city: 'New York', temperature: 8, conditions: 'Rainy', humidity: 85 },
    sydney: { city: 'Sydney', temperature: 28, conditions: 'Sunny', humidity: 45 },
};

const defaultWeather = { city: 'Unknown', temperature: 20, conditions: 'Clear', humidity: 50 };

app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'weather-service' });
});

app.get('/weather', (_req: Request, res: Response) => {
    // Return all cities weather
    const allWeather = Object.values(weatherData);
    res.json({
        timestamp: new Date().toISOString(),
        data: allWeather
    });
});

app.get('/weather/:city', (req: Request, res: Response) => {
    const cityName = (req.params.city as string).toLowerCase();
    const weather = weatherData[cityName] || { ...defaultWeather, city: req.params.city };

    res.json({
        timestamp: new Date().toISOString(),
        data: weather
    });
});

app.listen(PORT, () => {
    console.log(`🌤️  Weather service running on port ${PORT}`);
});
