# Zenith Soundscape - Setup Checklist

Use this checklist to track your progress setting up and deploying your app.

## ✅ Initial Setup (Local Development)

### Installation
- [ ] Navigated to project folder (`cd ~/Documents/zenith-soundscape`)
- [ ] Installed frontend dependencies (`npm install`)
- [ ] Installed backend dependencies (`cd backend && npm install`)

### Stripe Configuration
- [ ] Created Stripe account at stripe.com
- [ ] Switched to Test Mode
- [ ] Created Monthly subscription product ($3)
- [ ] Created Yearly subscription product ($20)
- [ ] Copied Monthly Price ID (price_...)
- [ ] Copied Yearly Price ID (price_...)
- [ ] Copied Secret Key (sk_test_...)
- [ ] Created webhook endpoint
- [ ] Selected required events (checkout.session.completed, etc.)
- [ ] Copied Webhook Secret (whsec_...)

### Environment Variables
- [ ] Created `.env.local` in root directory
- [ ] Created `.env` in backend directory
- [ ] Added all Stripe keys to backend/.env
- [ ] Added VITE_API_URL to .env.local
- [ ] Generated strong JWT_SECRET

### Testing
- [ ] Started backend server (`cd backend && npm run dev`)
- [ ] Started frontend server (`npm run dev`)
- [ ] Opened http://localhost:3000 in browser
- [ ] Tested 5 free sounds
- [ ] Created test account
- [ ] Clicked locked premium sound
- [ ] Completed test subscription with Stripe test card (4242...)
- [ ] Verified premium sounds unlocked
- [ ] Tested volume controls
- [ ] Tested logout/login

---

## 🚀 Production Deployment

### Pre-Deployment
- [ ] App working perfectly locally
- [ ] All features tested
- [ ] Database backup created (if applicable)
- [ ] Decided on hosting platform (Vercel, Railway, etc.)
- [ ] Switched Stripe to Live Mode
- [ ] Created live product prices
- [ ] Got live API keys (sk_live_...)

### Backend Deployment
- [ ] Deployed backend to chosen platform
- [ ] Set all environment variables in production
- [ ] Verified backend URL is accessible
- [ ] Checked backend logs for errors
- [ ] Tested health endpoint (https://your-backend/api/health)

### Frontend Deployment
- [ ] Built production frontend (`npm run build`)
- [ ] Deployed to chosen platform
- [ ] Set VITE_API_URL to production backend
- [ ] Verified frontend loads correctly
- [ ] Tested on mobile device

### Stripe Production Setup
- [ ] Updated webhook endpoint to production URL
- [ ] Updated Stripe keys in backend environment
- [ ] Updated Price IDs to live prices
- [ ] Tested webhook delivery in Stripe dashboard
- [ ] Verified webhook signing secret

### Final Testing
- [ ] Tested user signup in production
- [ ] Tested user login in production
- [ ] Tested free sounds work
- [ ] Attempted subscription with REAL test card
- [ ] Verified premium unlock works
- [ ] Tested on different browsers
- [ ] Tested on mobile devices
- [ ] Checked all 20 sounds load correctly

---

## 🎨 Customization (Optional)

- [ ] Changed app name/branding
- [ ] Modified color scheme
- [ ] Added custom sounds
- [ ] Updated pricing
- [ ] Added analytics tracking
- [ ] Set up error monitoring (Sentry)
- [ ] Added custom domain
- [ ] Updated SEO metadata
- [ ] Created privacy policy page
- [ ] Created terms of service page

---

## 📊 Post-Launch

- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure Stripe email notifications
- [ ] Set up backup schedule
- [ ] Monitor Stripe dashboard for payments
- [ ] Check error logs regularly
- [ ] Plan marketing strategy
- [ ] Set up customer support email
- [ ] Create user documentation
- [ ] Set up social media presence
- [ ] Prepare launch announcement

---

## 🔧 Maintenance Schedule

### Daily
- [ ] Check Stripe dashboard for new subscriptions
- [ ] Review error logs
- [ ] Monitor webhook success rate

### Weekly
- [ ] Check database size/performance
- [ ] Review server resource usage
- [ ] Respond to customer inquiries
- [ ] Monitor uptime statistics

### Monthly
- [ ] Update dependencies (`npm audit fix`)
- [ ] Review and optimize costs
- [ ] Analyze user metrics
- [ ] Plan new features
- [ ] Database backup verification

### Quarterly
- [ ] Security audit
- [ ] Performance optimization
- [ ] User feedback review
- [ ] Marketing effectiveness review

---

## 🆘 Troubleshooting Reference

### Common Issues

**Backend won't start:**
- [ ] Check .env file exists and has all variables
- [ ] Run `npm install` in backend directory
- [ ] Check port 3001 isn't already in use
- [ ] Review console error messages

**Frontend won't start:**
- [ ] Check .env.local file exists
- [ ] Run `npm install` in root directory
- [ ] Check port 3000 isn't already in use
- [ ] Try deleting node_modules and reinstalling

**Stripe webhook not working:**
- [ ] Verify webhook URL is correct
- [ ] Check signing secret matches .env
- [ ] Review Stripe webhook logs
- [ ] Ensure endpoint is publicly accessible

**Sounds not playing:**
- [ ] User must click on page first
- [ ] Check browser console for CORS errors
- [ ] Verify AudioContext is initialized
- [ ] Test with different browsers

**Subscription not activating:**
- [ ] Check webhook is receiving events
- [ ] Verify user ID is being passed correctly
- [ ] Check database for subscription status
- [ ] Review backend server logs

---

## 📝 Notes Section

Use this space for your own notes, API keys backup, or deployment details:

```
Backend URL: ___________________________________

Frontend URL: ___________________________________

Database: ___________________________________

Stripe Dashboard: https://dashboard.stripe.com

Important Dates:
- Launched: ___________________________________
- Last Updated: ___________________________________
- Next Review: ___________________________________

```

---

## 🎉 Congratulations!

Once you've checked off all the boxes in the Initial Setup section, you're ready to launch your ambient soundscape business!

Remember:
- Start with Test Mode in Stripe
- Test thoroughly before going live
- Keep your secrets secure
- Monitor regularly
- Listen to user feedback

Good luck! 🚀
