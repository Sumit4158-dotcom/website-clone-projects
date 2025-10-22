# BAJI Casino - Online Gaming Platform

A modern, full-featured online casino platform built with Next.js 15, featuring slots, sports betting, live casino, and comprehensive admin management.

## 🚀 Features

- **Game Categories**: Exclusive, Sports, Casino, Slots, Crash, Table, Fishing, Arcade, Lottery
- **User Authentication**: Secure login/register system
- **Admin Dashboard**: Complete management system for games, users, transactions, bonuses, and analytics
- **Responsive Design**: Perfect mobile and desktop experience
- **Real-time Updates**: Live game data and user interactions
- **Database**: Turso (LibSQL) for scalable data management

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Turso (LibSQL) + Drizzle ORM
- **UI Components**: Radix UI + Shadcn/UI
- **Authentication**: Better-auth (when configured)
- **Payments**: Stripe + Autumn.js (when configured)

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run database migrations
npm run db:push

# Seed the database (optional)
npm run db:seed

# Start development server
npm run dev
```

## 🌐 Deploy on Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables:

**Required Environment Variables:**

```env
TURSO_CONNECTION_URL=your_turso_connection_url
TURSO_AUTH_TOKEN=your_turso_auth_token
```

**Optional (for full features):**

```env
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=https://your-domain.vercel.app
STRIPE_SECRET_KEY=your_stripe_key
```

### Step 3: Deploy

Click "Deploy" and Vercel will automatically build and deploy your application.

### Step 4: Run Migrations

After deployment, you need to run database migrations. The migrations will run automatically with your Turso database credentials.

## 📝 Environment Variables Setup

### Turso Database (Required)

Your database is already configured with:
- Connection URL: `libsql://db-d0056af2-0815-473d-a9cf-5eb88c96bde4-orchids.aws-us-west-2.turso.io`
- Auth token is in your `.env` file

**For Vercel deployment**, add these exact values to your Vercel project environment variables.

### Getting Turso Credentials (if starting fresh)

```bash
# Install Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# Login
turso auth login

# Create database
turso db create baji-casino

# Get credentials
turso db show baji-casino
turso db tokens create baji-casino
```

## 🗄️ Database Management

```bash
# Push schema changes
npm run db:push

# Generate migrations
npm run db:generate

# Seed database with sample data
npm run db:seed
```

## 📱 Pages & Routes

### Public Routes
- `/` - Homepage with game categories
- `/sports` - Sports betting
- `/casino` - Live casino games
- `/slots` - Slot machines
- `/crash` - Crash games
- `/table` - Table games
- `/fishing` - Fishing games
- `/arcade` - Arcade games
- `/lottery` - Lottery games
- `/promos` - Promotions
- `/login` - User login
- `/register` - User registration

### Protected Routes
- `/profile` - User profile and settings
- `/admin` - Admin dashboard (requires admin privileges)
- `/admin/users` - User management
- `/admin/games` - Game management
- `/admin/providers` - Provider management
- `/admin/categories` - Category management
- `/admin/transactions` - Transaction history
- `/admin/bonuses` - Bonus management
- `/admin/logs` - Activity logs

## 🔒 Security Notes

- Never commit `.env` file to Git
- Use environment variables for all sensitive data
- Admin routes should implement proper authentication checks
- Database credentials are securely stored in Vercel environment variables

## 📊 Database Schema

The project includes comprehensive tables for:
- Users & Authentication
- Games & Categories
- Providers & Vendors
- Transactions & Bets
- Bonuses & Promotions
- Activity Logs

## 🎨 Design System

- **Primary Color**: #00c896 (Teal Green)
- **Background**: #1a1a1a (Dark)
- **Typography**: Poppins font family
- **Mobile-first**: Fully responsive design

## 🐛 Troubleshooting

### Build Errors on Vercel

If you encounter build errors:
1. Ensure all environment variables are set
2. Check that `.next` folder is in `.gitignore`
3. Verify no imports reference development-only files
4. Clear Vercel build cache and redeploy

### Database Connection Issues

1. Verify `TURSO_CONNECTION_URL` and `TURSO_AUTH_TOKEN` are correct
2. Check Turso database status: `turso db show baji-casino`
3. Ensure database migrations have been run

## 📄 License

Private - All rights reserved

## 👥 Support

For issues and support, contact the development team.