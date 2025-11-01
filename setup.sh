#!/bin/bash

# Zenith Soundscape - Quick Setup Script
# This script helps you set up your environment variables

echo "🎵 Zenith Soundscape - Environment Setup"
echo "========================================"
echo ""

# Check if .env files already exist
if [ -f "backend/.env" ]; then
    read -p "Backend .env file already exists. Overwrite? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping backend .env setup"
        SKIP_BACKEND=true
    fi
fi

if [ ! $SKIP_BACKEND ]; then
    echo "Setting up backend environment..."
    echo ""
    
    # Copy example file
    cp backend/.env.example backend/.env
    
    echo "Please enter your Stripe credentials:"
    echo ""
    
    read -p "Stripe Secret Key (sk_test_...): " STRIPE_SECRET
    read -p "Stripe Webhook Secret (whsec_...): " WEBHOOK_SECRET
    read -p "Stripe Monthly Price ID (price_...): " MONTHLY_PRICE
    read -p "Stripe Yearly Price ID (price_...): " YEARLY_PRICE
    
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Update .env file
    sed -i.bak "s|STRIPE_SECRET_KEY=.*|STRIPE_SECRET_KEY=$STRIPE_SECRET|" backend/.env
    sed -i.bak "s|STRIPE_WEBHOOK_SECRET=.*|STRIPE_WEBHOOK_SECRET=$WEBHOOK_SECRET|" backend/.env
    sed -i.bak "s|STRIPE_MONTHLY_PRICE_ID=.*|STRIPE_MONTHLY_PRICE_ID=$MONTHLY_PRICE|" backend/.env
    sed -i.bak "s|STRIPE_YEARLY_PRICE_ID=.*|STRIPE_YEARLY_PRICE_ID=$YEARLY_PRICE|" backend/.env
    sed -i.bak "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" backend/.env
    
    rm backend/.env.bak
    
    echo ""
    echo "✅ Backend environment configured!"
fi

# Frontend setup
if [ -f ".env.local" ]; then
    echo ""
    echo ".env.local already exists. Using existing file."
else
    echo ""
    echo "Setting up frontend environment..."
    cp .env.example .env.local
    echo "✅ Frontend environment configured!"
fi

echo ""
echo "========================================"
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm install' in the root directory"
echo "2. Run 'cd backend && npm install'"
echo "3. Start backend: 'cd backend && npm run dev'"
echo "4. Start frontend: 'npm run dev' (in new terminal)"
echo ""
echo "Check QUICKSTART.md for detailed instructions!"
