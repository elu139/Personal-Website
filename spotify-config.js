// Spotify Web API Configuration
const SPOTIFY_CONFIG = {
    CLIENT_ID: '8a3126a54a8c4a4d805d95495b5b930b', 
    CLIENT_SECRET: '', // Add your client secret here for local development only
    REDIRECT_URI: window.location.origin,
    SCOPES: [
        'user-read-recently-played',
        'user-top-read',
        'user-read-currently-playing'
    ].join(' ')
};

// Spotify API endpoints
const SPOTIFY_API = {
    TOKEN: 'https://accounts.spotify.com/api/token',
    TOP_TRACKS: 'https://api.spotify.com/v1/me/top/tracks',
    RECENTLY_PLAYED: 'https://api.spotify.com/v1/me/player/recently-played'
};

// For demo purposes, here are some sample tracks with preview URLs
const SAMPLE_TRACKS = [
    {
        name: "Bohemian Rhapsody",
        artists: [{ name: "Queen" }],
        album: {
            name: "A Night at the Opera",
            images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a" }]
        },
        preview_url: "https://p.scdn.co/mp3-preview/4e9e1c0e8a3e3e8e8e8e8e8e8e8e8e8e8e8e8e8e",
        external_urls: { spotify: "https://open.spotify.com/track/4u7EnebtmKWzUH433cf1Qv" }
    },
    {
        name: "Hotel California",
        artists: [{ name: "Eagles" }],
        album: {
            name: "Hotel California",
            images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a" }]
        },
        preview_url: null, // Some tracks don't have previews
        external_urls: { spotify: "https://open.spotify.com/track/40riOy7x9W7GXjyGp4pjAv" }
    },
    {
        name: "Imagine",
        artists: [{ name: "John Lennon" }],
        album: {
            name: "Imagine",
            images: [{ url: "https://i.scdn.co/image/ab67616d0000b273ce4f1737bc8a646c8c4bd25a" }]
        },
        preview_url: "https://p.scdn.co/mp3-preview/4e9e1c0e8a3e3e8e8e8e8e8e8e8e8e8e8e8e8e8e",
        external_urls: { spotify: "https://open.spotify.com/track/7pKfPomDEeI4TPT6EOYjn9" }
    }
];

export { SPOTIFY_CONFIG, SPOTIFY_API, SAMPLE_TRACKS };