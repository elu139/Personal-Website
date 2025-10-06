# Spotify Web Playback SDK Setup Guide

This guide will help you set up the new Spotify Web Playback SDK card on your website.

## What's New?

You now have **two Spotify cards** in your Playground:

1. **Original Card (Iframe Embeds)** - Works without authentication, but has playback limitations
2. **New Premium Card (Web Playback SDK)** - Requires Spotify Premium, but provides:
   - Full track playback (no 30-second limit for authenticated users)
   - Automatic pause when switching tracks
   - No one-time playback restriction
   - Full playback control

## Prerequisites

- **Spotify Premium Account** (required for Web Playback SDK)
- Node.js installed on your machine
- Spotify Developer Account

## Setup Steps

### 1. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in:
   - **App Name**: Your Website Name
   - **App Description**: Personal website Spotify integration
   - **Redirect URI**: `http://localhost:8888/callback`
   - Check the Terms of Service box
5. Click "Create"
6. On your app page, click "Settings"
7. Copy your **Client ID** and **Client Secret**

### 2. Configure Environment Variables

1. Create a `.env` file in your project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   SPOTIFY_CLIENT_ID=8a3126a54a8c4a4d805d95495b5b930b
   SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
   REDIRECT_URI=http://localhost:8888/callback
   PORT=8888
   ```

### 3. Install Dependencies

```bash
npm install
```

This will install:
- express
- cors
- axios
- dotenv

### 4. Start the Backend Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:8888`

### 5. Open Your Website

Open `index.html` in your browser (you can use a local server like Live Server in VS Code).

### 6. Connect Spotify

1. Navigate to the **Playground** page
2. You'll see the new "Connect Spotify Premium" card
3. Click "Connect with Spotify"
4. Log in with your Spotify Premium account
5. Authorize the app
6. You'll be redirected back and your top tracks will load!

## Architecture

### Files Created

- `server.js` - Backend authentication server
- `package.json` - Node.js dependencies
- `spotify-playback-sdk.js` - Web Playback SDK wrapper class
- `spotify-playback-card.js` - UI component for the new card
- `.env.example` - Environment variables template

### How It Works

1. **Authentication Flow**:
   - User clicks "Connect with Spotify"
   - Opens Spotify authorization popup
   - User authorizes the app
   - Backend exchanges auth code for access/refresh tokens
   - Tokens stored in localStorage

2. **Playback**:
   - Web Playback SDK creates a virtual player device
   - Your top tracks are fetched from Spotify API
   - Clicking a track plays it through the Web Player
   - Only one track plays at a time (automatic pause on switch)

3. **Token Refresh**:
   - Access tokens expire after 1 hour
   - Backend automatically refreshes them when needed

## Deployment Considerations

### For Production

1. **Update Redirect URI**:
   - In Spotify Developer Dashboard, add your production domain
   - Update `.env`: `REDIRECT_URI=https://yourdomain.com/callback`

2. **Secure Your Backend**:
   - Deploy `server.js` to a hosting service (Heroku, Railway, etc.)
   - Update frontend API calls to use your backend URL
   - **Never expose your Client Secret** in frontend code

3. **Environment Variables**:
   - Set environment variables on your hosting platform
   - Don't commit `.env` to git (it's in `.gitignore`)

### Recommended Hosting

- **Backend**: Railway, Heroku, Render, or Vercel Serverless Functions
- **Frontend**: Netlify, Vercel, or GitHub Pages (with separate backend)

## Troubleshooting

### "Make sure the backend server is running"
- Ensure `npm start` is running in your terminal
- Check that port 8888 is not in use

### "This feature requires a Spotify Premium account"
- The Web Playback SDK only works with Spotify Premium
- The original embed card will still work for free accounts

### Tokens not working
- Check that your Client Secret is correct in `.env`
- Try clearing localStorage and reconnecting

### CORS errors
- Make sure your backend server is running
- Check that `cors` is properly configured in `server.js`

## Security Notes

- ✅ Client Secret is stored on backend only
- ✅ Tokens are refreshed automatically
- ✅ HTTPS required for production
- ⚠️ Keep `.env` file private (don't commit to git)

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the backend server logs
3. Verify your Spotify Developer Dashboard settings
4. Ensure you're using a Spotify Premium account

## Additional Resources

- [Spotify Web Playback SDK Documentation](https://developer.spotify.com/documentation/web-playback-sdk)
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Authorization Guide](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)
