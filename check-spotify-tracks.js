// Script to check if specific tracks have Spotify previews
// Run this in browser console on your deployed site

const CLIENT_ID = '8a3126a54a8c4a4d805d95495b5b930b';

// Your requested tracks
const requestedTracks = [
    { name: "Best of Me", artist: "The Fur." },
    { name: "Underneath It All", artist: "No Doubt" },
    { name: "Duvet", artist: "Boa" },
    { name: "In Bloom", artist: "Nirvana" }
];

async function getSpotifyToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(CLIENT_ID + ':')}`
        },
        body: 'grant_type=client_credentials'
    });
    
    if (response.ok) {
        const data = await response.json();
        return data.access_token;
    }
    return null;
}

async function searchTrack(query, token) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (response.ok) {
        const data = await response.json();
        return data.tracks.items;
    }
    return [];
}

async function checkTracks() {
    console.log('Getting Spotify access token...');
    const token = await getSpotifyToken();
    
    if (!token) {
        console.log('Failed to get Spotify token');
        return;
    }
    
    console.log('Checking tracks for previews...\n');
    
    for (const track of requestedTracks) {
        const query = `track:"${track.name}" artist:"${track.artist}"`;
        console.log(`Searching for: ${track.name} by ${track.artist}`);
        
        const results = await searchTrack(query, token);
        
        if (results.length > 0) {
            const spotifyTrack = results[0];
            console.log(`✅ Found: ${spotifyTrack.name} by ${spotifyTrack.artists[0].name}`);
            console.log(`   Preview: ${spotifyTrack.preview_url ? 'YES' : 'NO'}`);
            console.log(`   Album: ${spotifyTrack.album.name}`);
            console.log(`   Spotify URL: ${spotifyTrack.external_urls.spotify}`);
            if (spotifyTrack.preview_url) {
                console.log(`   Preview URL: ${spotifyTrack.preview_url}`);
            }
        } else {
            console.log(`❌ Not found: ${track.name} by ${track.artist}`);
        }
        console.log('');
    }
}

// Run the check
checkTracks();