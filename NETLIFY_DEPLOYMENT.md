# Netlify Deployment Guide - Spotify Web Playback SDK

## Quick Deployment Steps

### 1. Set Environment Variables in Netlify

Go to your Netlify dashboard: https://app.netlify.com/sites/ethanlu/settings/deploys

1. Click **Site settings** → **Environment variables**
2. Add these variables:

```
SPOTIFY_CLIENT_ID = your_client_id_here
SPOTIFY_CLIENT_SECRET = your_client_secret_here
REDIRECT_URI = https://ethanlu.netlify.app/.netlify/functions/spotify-callback
URL = https://ethanlu.netlify.app
```

### 2. Update Spotify App Settings

Go to: https://developer.spotify.com/dashboard

1. Select your app
2. Click **Settings**
3. Scroll to **Redirect URIs**
4. Add: `https://ethanlu.netlify.app/.netlify/functions/spotify-callback`
5. Click **Add** then **Save**

### 3. Deploy to Netlify

Just push your changes to git:

```bash
git add .
git commit -m "Add Spotify Web Playback SDK with Netlify Functions"
git push
```

Netlify will automatically deploy!

---

## What Was Changed

### New Files:
- `netlify/functions/spotify-login.js` - Get auth URL
- `netlify/functions/spotify-callback.js` - Handle OAuth callback
- `netlify/functions/spotify-refresh.js` - Refresh access tokens
- `netlify.toml` - Netlify configuration

### Updated Files:
- `index.html` - Added new Spotify card
- `spotify-playback-card.js` - Uses Netlify Functions instead of local server
- `spotify-playback-sdk.js` - Uses Netlify Functions for token refresh

### Old Files (Can Keep or Delete):
- `server.js` - Not needed for Netlify (but useful for local testing)
- `package.json` - Only needed if you want to test locally with `npm start`

---

## How It Works on Netlify

1. **User clicks "Connect with Spotify"**
   - Calls `/.netlify/functions/spotify-login`
   - Gets Spotify auth URL
   - Opens Spotify login popup

2. **User authorizes on Spotify**
   - Spotify redirects to `/.netlify/functions/spotify-callback`
   - Function exchanges code for tokens
   - Redirects back to your site with tokens

3. **Playback works**
   - Tokens stored in browser localStorage
   - Web Playback SDK streams music
   - Token auto-refreshes via `/.netlify/functions/spotify-refresh`

---

## Testing Before Deployment

### Option 1: Netlify CLI (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your site
netlify link

# Set environment variables locally
netlify env:set SPOTIFY_CLIENT_ID "8a3126a54a8c4a4d805d95495b5b930b"
netlify env:set SPOTIFY_CLIENT_SECRET "d4b86fe5dfb941e999caaa2e1dc17fb5"

# Run locally with functions
netlify dev
```

This runs your site at `http://localhost:8888` with Netlify Functions working!

### Option 2: Just Deploy

Since Netlify Functions are serverless, you can just deploy and test on production.

---

## After Deployment

1. Visit: https://ethanlu.netlify.app
2. Go to **Playground** page
3. Scroll to the new **"Connect Spotify Premium"** card
4. Click **"Connect with Spotify"**
5. Log in and enjoy full track playback!

---

## Cost

**100% FREE FOREVER** ✨

Netlify free tier includes:
- 125k function requests/month
- 100 hours function runtime/month
- More than enough for personal use!

---

## Troubleshooting

### Functions not working after deployment

1. Check Netlify deploy logs for errors
2. Verify environment variables are set correctly
3. Make sure `netlify.toml` is committed

### "Redirect URI mismatch" error

- Make sure you added the exact redirect URI in Spotify Dashboard:
  `https://ethanlu.netlify.app/.netlify/functions/spotify-callback`

### Still seeing local server errors

- Clear your browser cache
- Make sure latest code is deployed (check Netlify deploy log)

---

## Security Notes

✅ Client Secret is **only** in Netlify environment variables (never in code)
✅ Functions run server-side (client can't see secrets)
✅ HTTPS automatic with Netlify
✅ Tokens stored only in user's browser localStorage

---

## Summary

You now have a **fully scalable, free, serverless** Spotify integration! The new card will:

- ✅ Allow full track playback (Spotify Premium users)
- ✅ Auto-pause when switching tracks
- ✅ No playback limits
- ✅ Work forever on Netlify's free tier
- ✅ Scale automatically with traffic

Original embed card still works for non-Premium users!
