// Spotify Web Playback SDK Implementation
class SpotifyPlaybackPlayer {
    constructor() {
        this.player = null;
        this.deviceId = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.isReady = false;
        this.currentTrack = null;
        this.tracks = [];
    }

    // Initialize the Web Playback SDK
    async init(accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;

        // Wait for Spotify SDK to be ready
        await this.waitForSpotifySDK();

        // Initialize player
        this.player = new Spotify.Player({
            name: 'Ethan\'s Web Player',
            getOAuthToken: cb => { cb(this.accessToken); },
            volume: 0.7
        });

        // Set up event listeners
        this.setupEventListeners();

        // Connect to the player
        const success = await this.player.connect();

        if (success) {
            console.log('Successfully connected to Spotify Web Playback SDK');
        }
    }

    // Wait for Spotify SDK script to load
    waitForSpotifySDK() {
        return new Promise((resolve) => {
            if (window.Spotify) {
                resolve();
            } else {
                window.onSpotifyWebPlaybackSDKReady = () => {
                    resolve();
                };
            }
        });
    }

    // Setup event listeners for the player
    setupEventListeners() {
        // Ready
        this.player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            this.deviceId = device_id;
            this.isReady = true;
            this.updateUI('ready');
        });

        // Not Ready
        this.player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
            this.isReady = false;
        });

        // Player state changed
        this.player.addListener('player_state_changed', (state) => {
            if (!state) return;

            this.currentTrack = state.track_window.current_track;
            this.updatePlayerUI(state);
        });

        // Errors
        this.player.addListener('initialization_error', ({ message }) => {
            console.error('Initialization Error:', message);
        });

        this.player.addListener('authentication_error', ({ message }) => {
            console.error('Authentication Error:', message);
            this.refreshAccessToken();
        });

        this.player.addListener('account_error', ({ message }) => {
            console.error('Account Error:', message);
            alert('This feature requires a Spotify Premium account.');
        });

        this.player.addListener('playback_error', ({ message }) => {
            console.error('Playback Error:', message);
        });
    }

    // Fetch user's top tracks
    async fetchTopTracks(limit = 4) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=short_term`, {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tracks');
            }

            const data = await response.json();
            this.tracks = data.items;
            return this.tracks;
        } catch (error) {
            console.error('Error fetching tracks:', error);
            return [];
        }
    }

    // Play a track
    async playTrack(trackUri) {
        if (!this.isReady) {
            console.error('Player not ready');
            return;
        }

        try {
            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`, {
                method: 'PUT',
                body: JSON.stringify({ uris: [trackUri] }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.accessToken}`
                }
            });
        } catch (error) {
            console.error('Error playing track:', error);
        }
    }

    // Toggle play/pause
    async togglePlay() {
        if (!this.player) return;

        await this.player.togglePlay();
    }

    // Pause playback
    async pause() {
        if (!this.player) return;

        await this.player.pause();
    }

    // Resume playback
    async resume() {
        if (!this.player) return;

        await this.player.resume();
    }

    // Seek to position (ms)
    async seek(positionMs) {
        if (!this.player) return;

        await this.player.seek(positionMs);
    }

    // Get current state
    async getCurrentState() {
        if (!this.player) return null;

        return await this.player.getCurrentState();
    }

    // Refresh access token
    async refreshAccessToken() {
        try {
            const response = await fetch('/.netlify/functions/spotify-refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refresh_token: this.refreshToken
                })
            });

            const data = await response.json();
            this.accessToken = data.access_token;

            console.log('Access token refreshed');
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }

    // Update UI when player state changes
    updatePlayerUI(state) {
        const event = new CustomEvent('spotifyStateChange', {
            detail: {
                state,
                paused: state.paused,
                position: state.position,
                duration: state.duration,
                track: state.track_window.current_track
            }
        });
        window.dispatchEvent(event);
    }

    // Update UI when ready
    updateUI(status) {
        const event = new CustomEvent('spotifyPlayerReady', {
            detail: { status }
        });
        window.dispatchEvent(event);
    }

    // Disconnect player
    disconnect() {
        if (this.player) {
            this.player.disconnect();
        }
    }
}

// Export for use in main script
window.SpotifyPlaybackPlayer = SpotifyPlaybackPlayer;
