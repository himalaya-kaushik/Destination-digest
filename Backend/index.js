
// backend/server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors middleware
import { collectTravelAdvisory, collectWeatherNews } from './services/rssFeed.js';
import { scrape } from './services/scrapper.js';
import { summarize } from './services/summarizer.js';
import { mailer } from './services/mailer.js';

const app = express();
const port = 2000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Define API endpoints
app.post('/api/collect-data', async (req, res) => {
  try {
    const destination = req.body.destination;
    const email = req.body.email;

    // Collect RSS feeds
    const rssDataForTravel = await collectTravelAdvisory(destination);  
    const rssDataForWeather = await collectWeatherNews(destination);

    // Scrape links
    const scrapedDataTravel = await scrape(rssDataForTravel);
    const scrapedDataWeather = await scrape(rssDataForWeather);

    // Summarize data
    const summarizedResultTravel = await summarize(scrapedDataTravel);
    const summarizedResultWeather = await summarize(scrapedDataWeather);

    const summarizedResult = [...summarizedResultTravel, ...summarizedResultWeather];
    const result = mailer(summarizedResult, email);
    // Send the summarized data back to the client
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

