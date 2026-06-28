// Spotify Player functionality
import { SPOTIFY_CONFIG, SPOTIFY_API, SAMPLE_TRACKS } from './spotify-config.js';

class SpotifyPlayer {
    constructor() {
        this.accessToken = null;
        this.currentTrack = null;
        this.audioElement = null;
        this.isPlaying = false;
        this.tracks = [];
    }

    // Get access token using Client Credentials flow (for public data)
    async getAccessToken() {
        try {
            const response = await fetch(SPOTIFY_API.TOKEN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${btoa(`${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`)}`
                },
                body: 'grant_type=client_credentials'
            });

            if (!response.ok) {
                throw new Error('Failed to get access token');
            }

            const data = await response.json();
            this.accessToken = data.access_token;
            return this.accessToken;
        } catch (error) {
            console.error('Error getting access token:', error);
            // Fallback to sample data
            return null;
        }
    }

    // Fetch user's top tracks (requires user authentication)
    async fetchTopTracks(limit = 5) {
        if (!this.accessToken) {
            console.log('Using sample tracks for demo');
            this.tracks = SAMPLE_TRACKS.slice(0, limit);
            return this.tracks;
        }

        try {
            const response = await fetch(`${SPOTIFY_API.TOP_TRACKS}?limit=${limit}&time_range=short_term`, {
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
            // Fallback to sample data
            this.tracks = SAMPLE_TRACKS.slice(0, limit);
            return this.tracks;
        }
    }

    // Play track preview
    playPreview(previewUrl, trackElement) {
        if (this.audioElement && !this.audioElement.paused) {
            this.stopPreview();
        }

        if (!previewUrl) {
            this.showNoPreviewMessage(trackElement);
            return;
        }

        this.audioElement = new Audio(previewUrl);
        this.audioElement.volume = 0.7;
        
        // Update UI
        const playButton = trackElement.querySelector('.play-button');
        playButton.innerHTML = this.getPauseIcon();
        playButton.classList.add('playing');

        this.audioElement.addEventListener('ended', () => {
            this.stopPreview();
        });

        this.audioElement.addEventListener('error', () => {
            this.showNoPreviewMessage(trackElement);
        });

        this.audioElement.play();
        this.isPlaying = true;
        this.currentTrack = trackElement;
    }

    // Stop track preview
    stopPreview() {
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement = null;
        }

        if (this.currentTrack) {
            const playButton = this.currentTrack.querySelector('.play-button');
            playButton.innerHTML = this.getPlayIcon();
            playButton.classList.remove('playing');
        }

        this.isPlaying = false;
        this.currentTrack = null;
    }

    // Show message when no preview is available
    showNoPreviewMessage(trackElement) {
        const playButton = trackElement.querySelector('.play-button');
        playButton.innerHTML = '🔇';
        playButton.title = 'No preview available';
        
        setTimeout(() => {
            playButton.innerHTML = this.getPlayIcon();
            playButton.title = 'Play preview';
        }, 2000);
    }

    // Generate HTML for the Spotify favorites card
    generateSpotifyCard() {
        return `
            <div class="skill-card spotify-card" id="spotify-favorites">
                <div class="spotify-header">
                    <div class="spotify-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.559.3z"/>
                        </svg>
                    </div>
                    <h4>Current Favorites</h4>
                </div>
                <div id="spotify-tracks" class="spotify-tracks">
                    <div class="loading">Loading tracks...</div>
                </div>
            </div>
        `;
    }

    // Generate HTML for individual track
    generateTrackHTML(track, index) {
        const hasPreview = track.preview_url !== null;
        return `
            <div class="track-item" data-index="${index}">
                <div class="track-image">
                    <img src="${track.album.images[0]?.url || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23ddd"/><text x="50" y="50" text-anchor="middle" dy="0.3em" fill="%23999">♪</text></svg>'}" alt="${track.album.name}" />
                    <div class="play-overlay ${hasPreview ? '' : 'no-preview'}">
                        <button class="play-button" title="${hasPreview ? 'Play preview' : 'No preview available'}" ${hasPreview ? '' : 'disabled'}>
                            ${hasPreview ? this.getPlayIcon() : '🔇'}
                        </button>
                    </div>
                </div>
                <div class="track-info">
                    <div class="track-name" title="${track.name}">${track.name}</div>
                    <div class="track-artist" title="${track.artists.map(a => a.name).join(', ')}">${track.artists.map(a => a.name).join(', ')}</div>
                </div>
                <div class="track-actions">
                    <a href="${track.external_urls.spotify}" target="_blank" class="spotify-link" title="Open in Spotify">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.559.3z"/>
                        </svg>
                    </a>
                </div>
            </div>
        `;
    }

    // Initialize the Spotify card
    async init() {
        // Load tracks (use sample data for demo)
        await this.fetchTopTracks(4);
        
        // Generate tracks HTML
        const tracksContainer = document.getElementById('spotify-tracks');
        if (tracksContainer) {
            tracksContainer.innerHTML = this.tracks.map((track, index) => 
                this.generateTrackHTML(track, index)
            ).join('');

            // Add event listeners
            this.addEventListeners();
        }
    }

    // Add event listeners to track elements
    addEventListeners() {
        const trackItems = document.querySelectorAll('.track-item');
        trackItems.forEach((item, index) => {
            const playButton = item.querySelector('.play-button');
            if (playButton && !playButton.disabled) {
                playButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const track = this.tracks[index];
                    
                    if (this.currentTrack === item && this.isPlaying) {
                        this.stopPreview();
                    } else {
                        this.playPreview(track.preview_url, item);
                    }
                });
            }
        });
    }

    // Icon helpers
    getPlayIcon() {
        return `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M8 5v14l11-7z"/>
        </svg>`;
    }

    getPauseIcon() {
        return `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>`;
    }
}

// Export for use in main script
window.SpotifyPlayer = SpotifyPlayer;
export { SpotifyPlayer };