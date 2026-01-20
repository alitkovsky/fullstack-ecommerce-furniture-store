# Fullstack E-commerce Furniture Store

A full-stack e-commerce application built with Next.js, Prisma (MongoDB), and Clerk. It includes a complete customer shopping experience and an admin dashboard for managing products, orders, and users.

## Live demo
- Deployed URL: replace with your Vercel URL

## Demo accounts
Admin:
- Email: admin@demo.com
- Password: set in Clerk

Customer:
- Email: customer@demo.com
- Password: set in Clerk

Tip: The app includes a demo credentials widget in the UI.

## Features
Customer experience:
- Product browsing and search
- Product detail pages
- Cart and wishlist
- Account page with order history

Admin experience:
- Admin dashboard at `/admin`
- Product, order, and user management
- Role-based access control

## Demo banner and navigation
- A demo banner and credentials widget appear in the UI for quick sign-in.
- Navigation adapts by route: `/admin` shows the admin header, other routes show the customer header.

## Tech stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Prisma + MongoDB
- Clerk authentication
- Vercel for deployment

## Quick start (local)
```bash
npm install
cp .env.example .env.local
npx prisma db push
npm run dev
```

## Environment variables
Required:
```bash
DATABASE_URL="mongodb+srv://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/auth"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/auth"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UUT_URL="/auth"
```

Optional:
```bash
ADMIN_EMAIL="your-admin-email@domain.com"
BLOB_READ_WRITE_TOKEN="your_vercel_blob_token"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Demo data
Seed demo data locally:
```bash
npx prisma db push
npx tsx scripts/setup-clean-demo.ts
```

Reset demo data:
```bash
npm run reset:demo
```

## Authorization system
Roles:
- Public users: browse products, add to cart (local)
- Customers: account page, wishlist, order history
- Admins: full admin access at `/admin`

Admin setup:
1) Sign up through the app
2) Set `ADMIN_EMAIL` in `.env.local`
3) Run:
```bash
npx tsx scripts/setup-admin.ts
```

## Deployment (Vercel)
1) Deploy to Vercel
2) Add environment variables in Vercel settings
3) Run database setup and seed
```bash
npx prisma db push
npx tsx scripts/seed-demo-data.ts
```

If products fail to load in production:
- Ensure `DATABASE_URL` includes the `mongodb+srv://` prefix
- Allow Vercel access in MongoDB Atlas (Network Access)
- Redeploy after env changes

## Useful URLs (local)
- Home: http://localhost:3000/
- Shop: http://localhost:3000/shop
- Admin: http://localhost:3000/admin
- API: http://localhost:3000/api/products
