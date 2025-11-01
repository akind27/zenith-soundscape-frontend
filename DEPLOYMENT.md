# Deployment Guide

This guide covers deploying Zenith Soundscape to popular hosting platforms.

## Prerequisites

- Your app working locally (test first!)
- Stripe account in Live Mode
- Live Stripe API keys
- Production database (if not using SQLite)

## Deployment Architecture

```
Frontend (Static) → Backend API → Database
                  ↓
                Stripe
```

---

## Option 1: Vercel + Railway (Recommended)

**Best for:** Easy setup, auto-scaling, great DX
**Cost:** Free tier available for both

### Step 1: Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app) and sign up
2. Click **New Project** → **Deploy from GitHub repo**
3. Connect your GitHub and select the repository
4. Railway will auto-detect your backend
5. Click on your service → **Variables** → Add these:

```
JWT_SECRET=generate-a-32-char-random-string
FRONTEND_URL=https://your-app.vercel.app
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_production_secret
STRIPE_MONTHLY_PRICE_ID=price_your_monthly_id
STRIPE_YEARLY_PRICE_ID=price_your_yearly_id
PORT=3001
```

6. Copy your Railway backend URL (e.g., `https://your-app.up.railway.app`)

### Step 2: Deploy Frontend to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. In your project root:
```bash
npm run build
vercel
```

3. Follow prompts:
   - Setup and deploy? **Yes**
   - Which scope? Choose your account
   - Link to existing project? **No**
   - Project name: zenith-soundscape
   - Directory: ./ (just press Enter)
   - Override settings? **No**

4. Set environment variable:
```bash
vercel env add VITE_API_URL
```
Enter: `https://your-app.up.railway.app/api`

5. Deploy production:
```bash
vercel --prod
```

### Step 3: Update Stripe Webhook

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Update endpoint URL to: `https://your-app.up.railway.app/api/webhook/stripe`
3. Make sure events are selected
4. Copy new signing secret and update Railway environment variable

✅ **Done!** Your app is live!

---

## Option 2: Netlify + Heroku

**Best for:** Simple deployment, mature platforms
**Cost:** Free tiers available

### Step 1: Deploy Backend to Heroku

1. Install Heroku CLI:
```bash
brew tap heroku/brew && brew install heroku
heroku login
```

2. Prepare backend for Heroku:
```bash
cd backend
```

Create `Procfile`:
```
web: node server.js
```

3. Create Heroku app:
```bash
heroku create your-zenith-backend
```

4. Set environment variables:
```bash
heroku config:set JWT_SECRET=your-random-secret
heroku config:set FRONTEND_URL=https://your-app.netlify.app
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_...
heroku config:set STRIPE_MONTHLY_PRICE_ID=price_...
heroku config:set STRIPE_YEARLY_PRICE_ID=price_...
```

5. Deploy:
```bash
git init
git add .
git commit -m "Deploy to Heroku"
heroku git:remote -a your-zenith-backend
git push heroku main
```

6. Note your backend URL: `https://your-zenith-backend.herokuapp.com`

### Step 2: Deploy Frontend to Netlify

1. Build your app:
```bash
cd ..
npm run build
```

2. Install Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
```

3. Deploy:
```bash
netlify deploy --prod --dir=dist
```

4. Set environment variable in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add `VITE_API_URL` = `https://your-zenith-backend.herokuapp.com/api`

5. Rebuild:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Step 3: Update Stripe Webhook

Update webhook URL to: `https://your-zenith-backend.herokuapp.com/api/webhook/stripe`

---

## Option 3: Render (All-in-One)

**Best for:** Single platform for everything
**Cost:** Free tier available

### Step 1: Create Render Account

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Deploy Backend

1. Click **New** → **Web Service**
2. Connect your repository
3. Settings:
   - **Name:** zenith-soundscape-backend
   - **Environment:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && node server.js`
   - **Plan:** Free

4. Add Environment Variables:
```
JWT_SECRET=your-secret
FRONTEND_URL=https://zenith-soundscape.onrender.com
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_YEARLY_PRICE_ID=price_...
```

5. Click **Create Web Service**
6. Copy your backend URL

### Step 3: Deploy Frontend

1. Click **New** → **Static Site**
2. Connect same repository
3. Settings:
   - **Name:** zenith-soundscape
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`

5. Click **Create Static Site**

### Step 4: Update Stripe Webhook

Update to: `https://your-backend.onrender.com/api/webhook/stripe`

---

## Option 4: DigitalOcean App Platform

**Best for:** More control, good performance
**Cost:** $5/month minimum

### Deploy Backend

1. Create new App from GitHub
2. Select backend directory
3. Configure environment variables
4. Choose $5/month plan

### Deploy Frontend

1. Create new Static Site from GitHub
2. Build command: `npm run build`
3. Output directory: `dist`
4. Configure environment variables

---

## Database Upgrade (Production)

For production, upgrade from SQLite to PostgreSQL:

### Using Railway

1. In Railway, click **New** → **Database** → **Add PostgreSQL**
2. Copy the connection URL
3. Update backend code to use PostgreSQL:

```bash
npm install pg
```

Replace SQLite code with:
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
```

### Using Heroku

1. Add Heroku Postgres:
```bash
heroku addons:create heroku-postgresql:mini
```

2. It auto-sets `DATABASE_URL` variable

---

## SSL/HTTPS Setup

Most platforms provide free SSL automatically. If using custom domain:

1. Add custom domain in hosting dashboard
2. Point DNS records:
   - Frontend: `A` or `CNAME` record
   - Backend: `CNAME` record
3. SSL certificates are auto-generated

---

## Post-Deployment Checklist

- [ ] Switch Stripe to Live Mode
- [ ] Update all Stripe keys to live keys
- [ ] Update webhook endpoint to production URL
- [ ] Test subscription flow with real card
- [ ] Set up monitoring (Railway/Vercel have built-in)
- [ ] Configure custom domain (optional)
- [ ] Set up backup strategy for database
- [ ] Test all features in production
- [ ] Update CORS settings if needed
- [ ] Enable error logging
- [ ] Set up uptime monitoring (UptimeRobot, etc.)

---

## Troubleshooting Production Issues

### Webhook Failures
- Check Stripe dashboard webhook logs
- Verify signing secret matches production
- Ensure endpoint is accessible publicly
- Check backend logs for errors

### CORS Errors
- Add production URL to CORS whitelist
- Check `FRONTEND_URL` environment variable
- Verify protocol (https vs http)

### Database Connection Issues
- Check connection string
- Verify SSL settings
- Check database plan limits
- Review connection pool settings

### Audio Files Not Loading
- Check CORS headers from archive.org
- Verify URLs are accessible
- Check browser console for errors
- Test with different browsers

---

## Monitoring & Maintenance

### Recommended Tools
- **Uptime Monitoring:** UptimeRobot (free)
- **Error Tracking:** Sentry (free tier)
- **Analytics:** Plausible or Google Analytics
- **Logs:** Built-in platform logging

### Regular Maintenance
- Monitor subscription webhook success rate
- Check database size and performance
- Review error logs weekly
- Update dependencies monthly
- Monitor Stripe dashboard for failed payments

---

## Scaling Considerations

When you grow:

1. **Database:** Move to managed PostgreSQL
2. **Caching:** Add Redis for session management
3. **CDN:** Use Cloudflare for audio files
4. **Load Balancing:** Use platform auto-scaling
5. **Monitoring:** Upgrade to premium monitoring

---

## Cost Estimates

### Small Scale (0-100 users)
- **Railway/Vercel:** $0-20/month
- **Stripe:** 2.9% + $0.30 per transaction
- **Total:** ~$20-40/month

### Medium Scale (100-1000 users)
- **Hosting:** $50-100/month
- **Database:** $15-30/month
- **Stripe Fees:** ~$200-300/month
- **Total:** ~$265-430/month

### Large Scale (1000+ users)
- Consider dedicated servers
- Implement CDN for assets
- Use professional monitoring
- Budget $500+/month

---

## Need Help?

- Check platform documentation
- Review error logs
- Test locally first
- Use platform support channels
- Check Stripe documentation

Good luck with your deployment! 🚀
