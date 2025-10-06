// Netlify Function: Get Spotify Authorization URL
exports.handler = async (event, context) => {
    const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = process.env.REDIRECT_URI || `${process.env.URL}/.netlify/functions/spotify-callback`;

    const SCOPES = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-top-read',
        'user-read-recently-played'
    ].join(' ');

    const authUrl = `https://accounts.spotify.com/authorize?` +
        `client_id=${CLIENT_ID}` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
        `&scope=${encodeURIComponent(SCOPES)}`;

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: authUrl })
    };
};
