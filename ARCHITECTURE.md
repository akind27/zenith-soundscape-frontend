# System Architecture

## High-Level Overview

```
┌─────────────┐
│   Browser   │
│   (User)    │
└──────┬──────┘
       │
       │ HTTPS
       ↓
┌─────────────────────────────────────────┐
│         React Frontend (Vite)           │
│  ┌───────────────────────────────────┐  │
│  │  Components:                      │  │
│  │  • AuthModal                      │  │
│  │  • SoundControl × 20              │  │
│  │  • SubscriptionModal              │  │
│  │  • App (Main)                     │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Context:                         │  │
│  │  • AuthContext (User State)       │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Web Audio API                    │  │
│  │  • AudioContext                   │  │
│  │  • GainNodes × 20                 │  │
│  │  • BufferSourceNodes × 20         │  │
│  └───────────────────────────────────┘  │
└────────────┬────────────────────────────┘
             │
             │ REST API
             │ /api/auth/*
             │ /api/subscription/*
             ↓
┌─────────────────────────────────────────┐
│      Express Backend (Node.js)          │
│  ┌───────────────────────────────────┐  │
│  │  Routes:                          │  │
│  │  • POST /api/auth/signup          │  │
│  │  • POST /api/auth/login           │  │
│  │  • GET  /api/auth/me              │  │
│  │  • POST /api/subscription/create  │  │
│  │  • POST /api/webhook/stripe       │  │
│  └───────────────────────────────────┘  │
│  ┌───────────────────────────────────┐  │
│  │  Middleware:                      │  │
│  │  • CORS                           │  │
│  │  • JWT Authentication             │  │
│  │  • Express JSON Parser            │  │
│  └───────────────────────────────────┘  │
└──────┬──────────────────┬───────────────┘
       │                  │
       │                  │ Webhooks
       ↓                  ↓
┌──────────────┐    ┌─────────────┐
│   SQLite     │    │   Stripe    │
│   Database   │    │   Payment   │
│              │    │   Platform  │
│  Users       │    │             │
│  • id        │    │  Checkout   │
│  • email     │    │  Sessions   │
│  • password  │    │  Webhooks   │
│  • premium   │    │  Products   │
│  • sub_id    │    │  Prices     │
│  • sub_end   │    │             │
└──────────────┘    └─────────────┘
```

## Data Flow

### 1. User Authentication Flow

```
User → Enter Email/Password
  ↓
Frontend → POST /api/auth/signup or /api/auth/login
  ↓
Backend → Hash password (bcrypt)
  ↓
Backend → Create/Verify user in Database
  ↓
Backend → Generate JWT token
  ↓
Frontend → Store token in localStorage
  ↓
Frontend → Update AuthContext
  ↓
App → Re-render with authenticated state
```

### 2. Sound Playback Flow

```
User → Click "Begin Relaxation"
  ↓
App → Create AudioContext
  ↓
SoundControl (×20) → Mount & Initialize
  ↓
Each SoundControl → Fetch audio file from archive.org
  ↓
Each SoundControl → Decode audio buffer
  ↓
Each SoundControl → Create audio nodes:
  • BufferSourceNode (plays audio)
  • GainNode (controls volume)
  ↓
Each SoundControl → Connect: Source → Gain → Speakers
  ↓
Each SoundControl → Start playback (volume = 0)
  ↓
User → Adjusts slider
  ↓
SoundControl → Ramp gain to new volume
  ↓
Sound plays at adjusted volume
```

### 3. Subscription Purchase Flow

```
User → Click locked premium sound
  ↓
App → Show SubscriptionModal (if not logged in → AuthModal)
  ↓
User → Choose plan (monthly/yearly)
  ↓
Frontend → POST /api/subscription/create-checkout
  ↓
Backend → Get/Create Stripe customer
  ↓
Backend → Create Stripe Checkout Session
  ↓
Backend → Return checkout URL
  ↓
Frontend → Redirect to Stripe Checkout
  ↓
User → Enters payment details on Stripe
  ↓
User → Completes payment
  ↓
Stripe → Redirects back to app
  ↓
Stripe → Sends webhook to backend
  ↓
Backend → Verify webhook signature
  ↓
Backend → Update user premium status in database
  ↓
Frontend → User refreshes → Premium unlocked!
```

### 4. Stripe Webhook Flow

```
Stripe Event Occurs:
  • checkout.session.completed
  • customer.subscription.updated
  • customer.subscription.deleted
  ↓
Stripe → POST /api/webhook/stripe
  ↓
Backend → Verify webhook signature
  ↓
Backend → Parse event type
  ↓
Backend → Update database:
  • Set is_premium flag
  • Store subscription_id
  • Store subscription_end_date
  ↓
User → Next login shows premium status
```

## Component Hierarchy

```
App
├── AuthContext.Provider
│   └── (wraps entire app)
│
├── [Not Initialized State]
│   ├── Welcome Screen
│   ├── "Begin Relaxation" Button
│   └── Sign In Button
│
└── [Initialized State]
    ├── Header
    │   ├── Title
    │   └── User Menu
    │       ├── User Avatar
    │       ├── Premium Badge
    │       ├── Upgrade Button
    │       └── Sign Out Button
    │
    ├── Main
    │   └── Sound Grid
    │       └── SoundControl × 20
    │           ├── Icon
    │           ├── Name
    │           ├── Lock Icon (if premium & not subscribed)
    │           └── Volume Slider
    │
    ├── Footer
    │   └── Premium Unlock Link
    │
    └── Modals
        ├── AuthModal
        │   ├── Email Input
        │   ├── Password Input
        │   ├── Submit Button
        │   └── Toggle Login/Signup
        │
        └── SubscriptionModal
            ├── Monthly Plan Card
            │   ├── Price
            │   ├── Features
            │   └── Subscribe Button
            │
            └── Yearly Plan Card
                ├── Price
                ├── Savings Badge
                ├── Features
                └── Subscribe Button
```

## Database Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,              -- bcrypt hashed
  is_premium INTEGER DEFAULT 0,        -- 0 = free, 1 = premium
  subscription_id TEXT,                -- Stripe subscription ID
  subscription_end_date TEXT,          -- ISO date string
  stripe_customer_id TEXT,             -- Stripe customer ID
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### Authentication

**POST /api/auth/signup**
- Body: `{ email, password }`
- Returns: `{ token, user }`
- Creates new user account

**POST /api/auth/login**
- Body: `{ email, password }`
- Returns: `{ token, user }`
- Authenticates existing user

**GET /api/auth/me**
- Headers: `Authorization: Bearer <token>`
- Returns: `{ id, email, isPremium, subscriptionId, subscriptionEndDate }`
- Gets current user info

### Subscription

**POST /api/subscription/create-checkout**
- Headers: `Authorization: Bearer <token>`
- Body: `{ plan: 'monthly' | 'yearly' }`
- Returns: `{ url }`
- Creates Stripe Checkout session

### Webhooks

**POST /api/webhook/stripe**
- Headers: `stripe-signature: <signature>`
- Body: Stripe event object
- Returns: `{ received: true }`
- Handles Stripe events

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3001/api
```

### Backend (.env)
```
PORT=3001
JWT_SECRET=<random-32-char-string>
FRONTEND_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_YEARLY_PRICE_ID=price_...
```

## Security Measures

1. **Password Security**
   - bcrypt hashing (10 rounds)
   - Never stored in plain text
   - Never transmitted in responses

2. **Authentication**
   - JWT tokens (signed)
   - 24-hour expiration
   - Stored in localStorage (client)
   - Verified on every protected route

3. **API Security**
   - CORS configured
   - Protected endpoints require auth
   - Input validation
   - SQL injection prevention (parameterized queries)

4. **Payment Security**
   - Stripe handles all payment data
   - No credit cards touch our servers
   - Webhook signature verification
   - PCI compliance via Stripe

## State Management

### Frontend State
- **AuthContext**: Global user state
- **Local State**: Component-specific data (volumes, UI state)
- **localStorage**: JWT token persistence

### Backend State
- **Database**: User accounts, subscriptions
- **Stripe**: Payment processing, subscription status
- **Server Memory**: Active connections, sessions

## Sound Configuration

```typescript
// Each sound object:
{
  id: 'unique-id',           // Identifier
  name: 'Display Name',      // UI label
  Icon: ReactComponent,      // SVG icon
  src: 'https://...',        // Audio file URL
  isPremium: true/false      // Free or premium
}
```

## Deployment Architecture

```
Production Setup:

┌──────────────┐
│   Vercel     │  Frontend (Static)
│   or Netlify│  - React build
│              │  - CDN distribution
└──────┬───────┘
       │
       │ API Calls
       ↓
┌──────────────┐
│   Railway    │  Backend (Node.js)
│   or Heroku  │  - Express API
│              │  - Environment vars
└──────┬───────┘
       │
       ├─────────────┐
       │             │
       ↓             ↓
┌──────────┐   ┌──────────┐
│PostgreSQL│   │  Stripe  │
│ Database │   │  API     │
└──────────┘   └──────────┘
```

## Performance Considerations

1. **Audio Loading**
   - Lazy load: Only load sounds when AudioContext starts
   - Reuse audio buffers (no re-fetching)
   - Progressive loading (one at a time)

2. **API Calls**
   - JWT reduces database queries
   - Cached user data in frontend
   - Webhook processing is async

3. **Database**
   - Indexed email column
   - Lightweight queries
   - Connection pooling (production)

## Scaling Strategy

**Phase 1: MVP (0-100 users)**
- Current setup sufficient
- SQLite adequate
- Free hosting tiers

**Phase 2: Growth (100-1000 users)**
- Migrate to PostgreSQL
- Add caching (Redis)
- Paid hosting plans

**Phase 3: Scale (1000+ users)**
- Load balancing
- CDN for audio files
- Database optimization
- Monitoring & analytics

## Error Handling

**Frontend:**
- Try-catch blocks
- User-friendly error messages
- Loading states
- Fallback UI

**Backend:**
- Express error middleware
- Validation errors
- Database errors
- Stripe API errors
- Webhook failures

**Monitoring:**
- Console logging (dev)
- Error tracking service (production)
- Stripe dashboard
- Server logs

---

This architecture provides a solid foundation for a scalable, secure, and maintainable ambient soundscape application with subscription billing.
