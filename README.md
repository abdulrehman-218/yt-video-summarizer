# YT Video Summarizer

YouTube Transcript Summarizer is a Node.js application designed to enable users to summarize transcripts from YouTube videos. It features a backend API that facilitates the summarization of these transcripts and the storage of the condensed information within a MongoDB database.

## Features

- **Summarize YouTube Video Transcripts**: Automatically summarize the transcripts of YouTube videos by providing the video URL.
- **Save Summaries**: Save the summarized transcripts along with video metadata (such as video ID and title) in a MongoDB database.
- **Retrieve Summaries**: Retrieve all saved video summaries from the database.

## Setup

1. **Install Dependencies**: Install the required dependencies using npm.

   npm install
   npm install youtube-captions-scraper


PORT=3000
MONGODB_URI=mongodb://localhost:27017/youtube_transcripts

npm start


# For Extension Youtube API Key is required
