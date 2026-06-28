// Netlify Function: Handle Spotify OAuth Callback
const axios = require('axios');

exports.handler = async (event, context) => {
    const code = event.queryStringParameters.code || null;

    if (!code) {
        return {
            statusCode: 302,
            headers: {
                'Location': '/#error=no_code'
            }
        };
    }

    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI || `${process.env.URL}/.netlify/functions/spotify-callback`;

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
        const frontendUrl = process.env.URL || 'https://ethanlu.netlify.app';

        return {
            statusCode: 302,
            headers: {
                'Location': `${frontendUrl}/#access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}`
            }
        };
    } catch (error) {
        console.error('Error getting token:', error.response?.data || error.message);

        return {
            statusCode: 302,
            headers: {
                'Location': '/#error=token_error'
            }
        };
    }
};
