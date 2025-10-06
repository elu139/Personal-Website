# Quick Start Guide - Spotify Web Playback SDK

## TL;DR

1. Get your Spotify Client Secret from [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Create `.env` file: `cp .env.example .env`
3. Add your secret to `.env`
4. Run: `npm install && npm start`
5. Open your website and click "Connect with Spotify" in Playground

## Testing Locally

```bash
# Terminal 1 - Start backend server
npm start

# Terminal 2 - Start local web server (if needed)
# Option 1: Python
python -m http.server 3000

# Option 2: Node.js http-server
npx http-server -p 3000

# Option 3: VS Code Live Server extension
# Just open index.html and click "Go Live"
```

Then open `http://localhost:3000` in your browser.

## What You'll See

### Before Connection
- Green "Connect Spotify Premium" card
- Click button to authenticate

### After Connection
- Card shows your top 5 tracks from Spotify
- Click any track to play it
- Tracks automatically pause when switching
- Full playback control (no limitations!)

## Differences from Old Card

| Feature | Old Card (Embeds) | New Card (Web Playback SDK) |
|---------|------------------|----------------------------|
| Authentication | Not required | Spotify Premium required |
| Playback limit | 30 seconds | Full tracks |
| Multiple songs | Play simultaneously | Auto-pause previous |
| One-time restriction | Yes | No |
| Setup | None | Backend server needed |

## Need Help?

See full documentation in `SPOTIFY_SETUP.md`
