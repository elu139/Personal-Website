// Spotify Authentication Server for Web Playback SDK
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8888;

// Spotify credentials - IMPORTANT: Add these to .env file
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '8a3126a54a8c4a4d805d95495b5b930b';
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';

// Scopes for Spotify Web Playback SDK
const SCOPES = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-top-read',
    'user-read-recently-played'
].join(' ');

app.use(cors());
app.use(express.json());

// Route 1: Get authorization URL
app.get('/auth/login', (req, res) => {
    const authUrl = `https://accounts.spotify.com/authorize?` +
        `client_id=${CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=${encodeURIComponent(SCOPES)}`;

    res.json({ url: authUrl });
});

// Route 2: Handle callback and exchange code for token
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    if (!code) {
        res.redirect('/#error=no_code');
        return;
    }

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            }),
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;

        // Redirect back to frontend with tokens
        res.redirect(`http://localhost:3000/#access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`);
    } catch (error) {
        console.error('Error getting token:', error.response?.data || error.message);
        res.redirect('/#error=token_error');
    }
});

// Route 3: Refresh access token
app.post('/auth/refresh', async (req, res) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
        return res.status(400).json({ error: 'Refresh token required' });
    }

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            }),
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('Error refreshing token:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to refresh token' });
    }
});

app.listen(PORT, () => {
    console.log(`Spotify auth server running on http://localhost:${PORT}`);
    console.log(`Make sure to set SPOTIFY_CLIENT_SECRET in your .env file`);
});
