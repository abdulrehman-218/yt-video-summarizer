const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { saveVideoSummary, getAllVideoSummaries } = require('./VideoSummaryController');
const { getSubtitles } = require('youtube-captions-scraper');


const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = '';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Summarize YouTube video transcript and save to database
app.get('/api/summarize', async (req, res) => {
    const { videoId } = req.query;

    try {
        // read YouTube video transcript by id
        const transcript = await readSummarizedTranscript(videoId);
  
        // Save summary to database
        const video = await saveVideoSummary(videoId, 'video_title_here', transcript);

        res.json({ transcript });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to summarize video transcript' });
    }
});

// Fetch YouTube video transcript using YouTube Data API
async function readSummarizedTranscript(videoId) {
    try {
      // Await the getSubtitles promise
      const captions = await getSubtitles({ videoID: videoId });
  
      // Concatenate all 'text' fields from the captions
      const concatenatedText = captions.map(caption => caption.text).join(' ');
  
      // Return the concatenated text
      return concatenatedText;

    } catch (err) {
      // Handle any errors that occur during fetching or processing
      console.error(err);
      return ''; // Return an empty string or handle the error as needed
    }
  }

// Retrieve all video summaries
app.get('/api/videos', async (req, res) => {
    try {
        const videos = await getAllVideoSummaries();
        res.json(videos);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to retrieve video summaries' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
