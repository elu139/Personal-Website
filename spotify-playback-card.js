// Spotify Web Playback SDK Card UI Component
class SpotifyPlaybackCard {
    constructor() {
        this.player = null;
        this.tracks = [];
        this.isAuthenticated = false;
        this.currentPlayingIndex = null;
    }

    // Generate the card HTML
    generateCard() {
        return `
            <div class="skill-card spotify-playback-card" style="background: linear-gradient(135deg, #1ed760 0%, #191414 100%); color: white; padding: 1.5rem; max-height: 550px; display: flex; flex-direction: column;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.2); padding-bottom: 0.75rem;">
                    <div style="color: #1ed760;">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.559.3z"/>
                        </svg>
                    </div>
                    <h4 style="color: white; margin: 0; font-weight: 600;">
                        ${this.isAuthenticated ? 'My Top Tracks (Premium Player)' : 'Connect Spotify Premium'}
                    </h4>
                </div>

                <div id="spotify-playback-content" style="flex: 1; overflow-y: auto;">
                    ${this.isAuthenticated ? this.generateTracksHTML() : this.generateConnectHTML()}
                </div>
            </div>
        `;
    }

    // Generate connect button HTML
    generateConnectHTML() {
        return `
            <div style="text-align: center; padding: 2rem;">
                <p style="margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6;">
                    Connect your Spotify Premium account to play full tracks directly in your browser with no playback limits!
                </p>
                <button
                    id="spotify-connect-btn"
                    onclick="window.spotifyPlaybackCard.handleConnect()"
                    style="background: #1ed760; color: #191414; border: none; border-radius: 25px; padding: 0.75rem 2rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(30, 215, 96, 0.3);"
                    onmouseover="this.style.background='#1fdf64'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(30, 215, 96, 0.4)'"
                    onmouseout="this.style.background='#1ed760'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(30, 215, 96, 0.3)'"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style="vertical-align: middle; margin-right: 0.5rem;">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.559.3z"/>
                    </svg>
                    Connect with Spotify
                </button>
                <p style="margin-top: 1rem; font-size: 0.85rem; color: rgba(255, 255, 255, 0.7);">
                    Requires Spotify Premium
                </p>
            </div>
        `;
    }

    // Generate tracks list HTML
    generateTracksHTML() {
        if (!this.tracks || this.tracks.length === 0) {
            return `<div style="text-align: center; padding: 2rem;">Loading your top tracks...</div>`;
        }

        return `
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                ${this.tracks.map((track, index) => this.generateTrackItemHTML(track, index)).join('')}
            </div>
        `;
    }

    // Generate individual track item HTML
    generateTrackItemHTML(track, index) {
        const isPlaying = this.currentPlayingIndex === index;

        return `
            <div class="playback-track-item" data-index="${index}" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; border-radius: 8px; background: rgba(255, 255, 255, 0.1); transition: all 0.3s ease; cursor: pointer; ${isPlaying ? 'background: rgba(30, 215, 96, 0.2); border: 1px solid rgba(30, 215, 96, 0.5);' : ''}"
                onmouseover="if(!${isPlaying}) this.style.background='rgba(255, 255, 255, 0.15)'"
                onmouseout="if(!${isPlaying}) this.style.background='rgba(255, 255, 255, 0.1)'"
                onclick="window.spotifyPlaybackCard.playTrack(${index})">

                <div style="position: relative; width: 55px; height: 55px; border-radius: 8px; overflow: hidden; flex-shrink: 0;">
                    <img src="${track.album.images[0]?.url || ''}" alt="${track.album.name}" style="width: 100%; height: 100%; object-fit: cover;" />
                    ${isPlaying ? `
                        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(30, 215, 96, 0.3); display: flex; align-items: center; justify-content: center;">
                            <div style="width: 20px; height: 20px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                        </div>
                    ` : ''}
                </div>

                <div style="flex: 1; min-width: 0;">
                    <div style="font-weight: 600; font-size: 0.95rem; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.25rem;" title="${track.name}">${track.name}</div>
                    <div style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.7); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${track.artists.map(a => a.name).join(', ')}">${track.artists.map(a => a.name).join(', ')}</div>
                </div>

                <div style="flex-shrink: 0; display: flex; gap: 0.5rem; align-items: center;">
                    <button
                        class="playback-control-btn"
                        onclick="event.stopPropagation(); window.spotifyPlaybackCard.playTrack(${index})"
                        style="background: ${isPlaying ? '#1ed760' : 'rgba(255, 255, 255, 0.1)'}; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; transition: all 0.3s ease;"
                        onmouseover="this.style.background='#1ed760'; this.style.transform='scale(1.1)'"
                        onmouseout="this.style.background='${isPlaying ? '#1ed760' : 'rgba(255, 255, 255, 0.1)'}'; this.style.transform='scale(1)'"
                        title="${isPlaying ? 'Playing' : 'Play'}">
                        ${isPlaying ?
                            '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><circle cx="8" cy="12" r="2" /><circle cx="16" cy="12" r="2" /><circle cx="12" cy="12" r="2" /></svg>' :
                            '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M8 5v14l11-7z"/></svg>'}
                    </button>
                </div>
            </div>
        `;
    }

    // Handle connect button click
    async handleConnect() {
        try {
            // Get auth URL from Netlify Function
            const response = await fetch('/.netlify/functions/spotify-login');
            const data = await response.json();

            // Open Spotify authorization in popup
            const width = 450;
            const height = 730;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;

            window.open(
                data.url,
                'Spotify Authorization',
                `width=${width},height=${height},left=${left},top=${top}`
            );
        } catch (error) {
            console.error('Error initiating Spotify auth:', error);
            alert('Failed to connect to Spotify. Make sure the backend server is running.');
        }
    }

    // Handle successful authentication
    async handleAuthSuccess(accessToken, refreshToken) {
        this.isAuthenticated = true;

        // Initialize player
        this.player = new SpotifyPlaybackPlayer();
        await this.player.init(accessToken, refreshToken);

        // Fetch top tracks
        this.tracks = await this.player.fetchTopTracks(5);

        // Update the card UI
        this.refresh();

        // Listen for player state changes
        window.addEventListener('spotifyStateChange', (e) => {
            this.handleStateChange(e.detail);
        });
    }

    // Handle player state changes
    handleStateChange(detail) {
        if (detail.paused) {
            this.currentPlayingIndex = null;
        }
        this.refresh();
    }

    // Play a track
    async playTrack(index) {
        if (!this.player || !this.tracks[index]) return;

        // If clicking the same track, toggle play/pause
        if (this.currentPlayingIndex === index) {
            await this.player.togglePlay();
        } else {
            // Play new track
            this.currentPlayingIndex = index;
            const trackUri = this.tracks[index].uri;
            await this.player.playTrack(trackUri);
        }

        this.refresh();
    }

    // Refresh the card
    refresh() {
        const container = document.getElementById('spotify-playback-container');
        if (container) {
            container.innerHTML = this.generateCard();
        }
    }

    // Initialize the card
    init() {
        // Check URL hash for tokens
        this.checkForTokens();

        // Render initial card
        const container = document.getElementById('spotify-playback-container');
        if (container) {
            container.innerHTML = this.generateCard();
        }
    }

    // Check URL hash for auth tokens
    checkForTokens() {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
            // Clear hash
            window.history.replaceState(null, null, ' ');

            // Store tokens
            localStorage.setItem('spotify_access_token', accessToken);
            localStorage.setItem('spotify_refresh_token', refreshToken);

            // Initialize player
            this.handleAuthSuccess(accessToken, refreshToken);
        } else {
            // Check localStorage for existing tokens
            const storedAccessToken = localStorage.getItem('spotify_access_token');
            const storedRefreshToken = localStorage.getItem('spotify_refresh_token');

            if (storedAccessToken && storedRefreshToken) {
                this.handleAuthSuccess(storedAccessToken, storedRefreshToken);
            }
        }
    }
}

// Add spin animation for playing indicator
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Export for use in main script
window.SpotifyPlaybackCard = SpotifyPlaybackCard;
window.spotifyPlaybackCard = new SpotifyPlaybackCard();
