# Zenith Soundscape - Premium Ambient Sound Generator

A beautiful, freemium ambient soundscape generator with 20 professionally curated sounds. Users get 5 free sounds, with 15 premium sounds available through subscription ($3/month or $20/year).

## Features

- 🎵 **20 Ambient Sounds**: Rain, waves, fire, thunder, meditation bells, and more
- 🆓 **5 Free Sounds**: Try the app with no commitment
- ⭐ **Premium Subscription**: Unlock all 15 premium sounds
- 🔐 **User Authentication**: Secure account system
- 💳 **Stripe Integration**: Professional payment processing
- 📱 **Responsive Design**: Works on all devices
- 🎚️ **Mix & Match**: Adjust volume for each sound independently

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Web Audio API for sound playback

### Backend
- Node.js with Express
- SQLite database
- JWT authentication
- Stripe for payments

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Stripe account (for payment processing)
- A Mac, Linux, or Windows computer

### 1. Clone/Navigate to Project

```bash
cd ~/Documents/zenith-soundscape
```

### 2. Install Dependencies

#### Frontend
```bash
npm install
```

#### Backend
```bash
cd backend
npm install
cd ..
```

### 3. Configure Stripe

#### Create Stripe Products and Prices

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Products** → **Add Product**
3. Create two products:

**Monthly Subscription:**
- Name: "Zenith Soundscape Premium - Monthly"
- Price: $3.00 USD
- Billing period: Monthly
- Copy the Price ID (starts with `price_...`)

**Yearly Subscription:**
- Name: "Zenith Soundscape Premium - Yearly"
- Price: $20.00 USD
- Billing period: Yearly
- Copy the Price ID (starts with `price_...`)

#### Get Your Stripe Keys

1. Go to **Developers** → **API Keys**
2. Copy your **Publishable key** (starts with `pk_test_...`)
3. Copy your **Secret key** (starts with `sk_test_...`)

#### Set Up Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `http://localhost:3001/api/webhook/stripe` (for development)
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the **Signing secret** (starts with `whsec_...`)

### 4. Set Up Environment Variables

#### Frontend (.env.local)
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
VITE_API_URL=http://localhost:3001/api
```

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=3001
JWT_SECRET=your-random-secret-key-min-32-chars-please-change-this
FRONTEND_URL=http://localhost:3000

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret
STRIPE_MONTHLY_PRICE_ID=price_your_monthly_price_id
STRIPE_YEARLY_PRICE_ID=price_your_yearly_price_id
```

**Important:** Generate a strong JWT_SECRET (at least 32 random characters)

### 5. Run the Application

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

The backend will run on http://localhost:3001

#### Terminal 2 - Frontend Development Server
```bash
npm run dev
```

The frontend will run on http://localhost:3000

### 6. Test the Application

1. Open http://localhost:3000
2. Click "Begin Relaxation"
3. Try the 5 free sounds
4. Create an account
5. Click on a locked premium sound
6. Test the subscription flow with Stripe test cards:
   - Card: `4242 4242 4242 4242`
   - Date: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

## Deployment

### Option 1: Vercel (Frontend) + Heroku (Backend)

#### Frontend on Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Build and deploy:
```bash
npm run build
vercel --prod
```

3. Set environment variables in Vercel dashboard:
   - `VITE_API_URL` = your backend URL

#### Backend on Heroku

1. Install Heroku CLI and login:
```bash
brew tap heroku/brew && brew install heroku
heroku login
```

2. Create Heroku app:
```bash
cd backend
heroku create your-app-name
```

3. Set environment variables:
```bash
heroku config:set JWT_SECRET=your-secret
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_...
heroku config:set STRIPE_MONTHLY_PRICE_ID=price_...
heroku config:set STRIPE_YEARLY_PRICE_ID=price_...
heroku config:set FRONTEND_URL=https://your-vercel-app.vercel.app
```

4. Deploy:
```bash
git init
heroku git:remote -a your-app-name
git add .
git commit -m "Initial deployment"
git push heroku main
```

5. Update Stripe webhook endpoint to production URL

### Option 2: Netlify + Railway

#### Frontend on Netlify

1. Build:
```bash
npm run build
```

2. Deploy dist folder via Netlify drop

3. Set environment variable `VITE_API_URL`

#### Backend on Railway

1. Go to [Railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add environment variables
4. Deploy

### Option 3: All-in-One with Render

1. Create account at [Render.com](https://render.com)
2. Create Web Service for backend
3. Create Static Site for frontend
4. Configure environment variables
5. Update CORS settings

## Database

The app uses SQLite for development, which is perfect for getting started. For production, consider upgrading to:

- PostgreSQL (recommended)
- MySQL
- MongoDB

To migrate to PostgreSQL:
1. Replace `sqlite3` with `pg` in `backend/package.json`
2. Update database connection in `backend/server.js`
3. Use environment variable for database URL

## File Structure

```
zenith-soundscape/
├── src/
│   ├── components/
│   │   ├── AuthModal.tsx
│   │   ├── SoundControl.tsx
│   │   ├── SubscriptionModal.tsx
│   │   └── icons.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── constants.ts
│   ├── types.ts
│   ├── App.tsx
│   └── index.tsx
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Switching to Production Mode

1. Update Stripe keys to live mode (`sk_live_...` and `pk_live_...`)
2. Update product prices to use live price IDs
3. Generate a strong JWT_SECRET (use openssl): 
   ```bash
   openssl rand -base64 32
   ```
4. Set up production database (PostgreSQL recommended)
5. Configure production webhook endpoints in Stripe
6. Update CORS settings for your production domain
7. Enable HTTPS (required for Stripe)

## Security Considerations

- ✅ Never commit `.env` files
- ✅ Use HTTPS in production
- ✅ Rotate JWT secrets periodically
- ✅ Use strong passwords
- ✅ Keep dependencies updated
- ✅ Use environment variables for all secrets
- ✅ Enable Stripe webhook signature verification

## Troubleshooting

### Stripe Webhook Not Working
- Check webhook signing secret matches `.env`
- Ensure endpoint URL is accessible
- Check Stripe dashboard for webhook delivery logs

### Audio Not Playing
- Check browser console for errors
- Ensure user has interacted with page before playback
- Check CORS headers on audio files

### Database Errors
- Delete `database.sqlite` and restart backend
- Check file permissions
- Ensure SQLite is installed

## Support

For issues or questions:
- Check the Stripe documentation: https://stripe.com/docs
- Review browser console for errors
- Check backend server logs

## License

MIT License - Feel free to use for your own projects!

## Credits

- Sounds sourced from Archive.org
- Built with React, Express, and Stripe
- Icons from Lucide React
