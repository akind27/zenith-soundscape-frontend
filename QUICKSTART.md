# Quick Start Guide

Follow these steps to get your Zenith Soundscape app running locally in under 10 minutes!

## Step 1: Install Dependencies (2 minutes)

Open Terminal and run:

```bash
cd ~/Documents/zenith-soundscape

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

## Step 2: Set Up Stripe (5 minutes)

### Get Your Stripe Account
1. Go to https://stripe.com and create a free account
2. Stay in **Test Mode** (top-right toggle)

### Create Products
1. Click **Products** → **+ Add Product**
2. Create **Monthly Plan**:
   - Name: Premium Monthly
   - Price: $3.00
   - Recurring: Monthly
   - Click "Save product"
   - **Copy the Price ID** (looks like `price_1ABC...`)

3. Create **Yearly Plan**:
   - Name: Premium Yearly
   - Price: $20.00
   - Recurring: Yearly
   - Click "Save product"
   - **Copy the Price ID**

### Get API Keys
1. Click **Developers** (top menu) → **API Keys**
2. **Copy your Secret key** (click "Reveal test key", starts with `sk_test_`)

### Create Webhook
1. Click **Developers** → **Webhooks** → **Add endpoint**
2. Endpoint URL: `http://localhost:3001/api/webhook/stripe`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click "Add endpoint"
5. **Copy the Signing secret** (starts with `whsec_`)

## Step 3: Configure Environment Variables (2 minutes)

### Backend Configuration

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` in VS Code and add your Stripe keys:

```env
PORT=3001
JWT_SECRET=supersecretkey12345678901234567890
FRONTEND_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
STRIPE_MONTHLY_PRICE_ID=price_YOUR_MONTHLY_PRICE_ID
STRIPE_YEARLY_PRICE_ID=price_YOUR_YEARLY_PRICE_ID
```

### Frontend Configuration

```bash
cd ..
cp .env.example .env.local
```

The default values in `.env.local` should work as-is.

## Step 4: Start the App (1 minute)

You need TWO terminal windows:

### Terminal 1 - Backend
```bash
cd ~/Documents/zenith-soundscape/backend
npm run dev
```

You should see: "Server running on port 3001"

### Terminal 2 - Frontend
```bash
cd ~/Documents/zenith-soundscape
npm run dev
```

You should see: "Local: http://localhost:3000"

## Step 5: Test It Out!

1. Open your browser to **http://localhost:3000**
2. Click "Begin Relaxation"
3. Try the 5 free sounds (Rain, Waves, Birds, Fire, Wind)
4. Click "Sign In" → "Sign Up" to create an account
5. Click a locked sound (with yellow "Premium" label)
6. Choose a subscription plan
7. Use Stripe test card:
   - Card number: `4242 4242 4242 4242`
   - Expiration: Any future date
   - CVC: `123`
   - ZIP: `12345`
8. Complete payment
9. Enjoy all 20 sounds!

## Troubleshooting

### "Cannot find module"
```bash
# Make sure you installed dependencies
npm install
cd backend && npm install
```

### "Port 3000 is already in use"
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Stripe webhook not working
- Make sure the webhook URL in Stripe dashboard matches exactly: `http://localhost:3001/api/webhook/stripe`
- Check that you're in Test Mode in Stripe
- Verify the webhook secret in your `.env` file

### Sounds not playing
- Click on the page first (browser requires user interaction)
- Check browser console (Right-click → Inspect → Console)
- Make sure you clicked "Begin Relaxation"

## Next Steps

- Read the full README.md for deployment instructions
- Customize the sounds in `src/constants.ts`
- Change the color scheme in the components
- Deploy to production!

## Need Help?

Check the main README.md for detailed troubleshooting and deployment guides.

---

🎵 Enjoy building your ambient soundscape app!
