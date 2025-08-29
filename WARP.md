# 🪑 Fullstack E-Commerce Furniture Store

A modern, feature-rich e-commerce application built with Next.js 15, TypeScript, and MongoDB, specifically designed for furniture retail with complete admin management capabilities.

## 🎯 Project Overview

This is a production-ready fullstack e-commerce platform that has been modernized from static data to a fully database-driven application. The project includes customer-facing shopping experiences, comprehensive admin management, and modern cloud integrations.

### Key Features
- **🛍️ Customer Shopping Experience**: Browse products, view details, add to cart/wishlist
- **👨‍💼 Admin Management Panel**: Complete CRUD operations for products with image uploads
- **☁️ Cloud Integration**: Vercel Blob storage for images, MongoDB Atlas database
- **🔐 Authentication**: Clerk integration with role-based access control
- **📱 Responsive Design**: Mobile-first approach with modern UI/UX
- **⚡ Performance Optimized**: Server-side rendering, image optimization, lazy loading

## 🏗️ Architecture

```mermaid
graph TB
    A[Next.js Frontend] --> B[API Routes]
    B --> C[Prisma ORM]
    C --> D[MongoDB Atlas]
    B --> E[Vercel Blob Storage]
    F[Clerk Auth] --> A
    G[Admin Panel] --> B
    H[Customer Portal] --> B
```

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **UI/UX**: Tailwind CSS, Framer Motion, Radix UI, Shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: MongoDB Atlas with Prisma ORM
- **Authentication**: Clerk
- **File Storage**: Vercel Blob
- **Deployment**: Vercel Platform

## 📁 Project Structure

```
fullstack-ecommerce-furniture-store/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin-only routes
│   │   └── admin/
│   │       ├── lazyload.tsx      # Admin loading component
│   │       └── page.tsx          # Admin dashboard
│   ├── account/                  # User account management
│   ├── admin/                    # Admin panel
│   ├── api/                      # API routes
│   │   ├── products/            # Product CRUD operations
│   │   └── upload-image/        # Vercel Blob image upload
│   ├── auth/                     # Authentication pages
│   ├── blog/                     # Blog section
│   ├── cart/                     # Shopping cart
│   ├── checkout/                 # Checkout process
│   ├── components/               # Reusable UI components
│   ├── contact/                  # Contact page
│   ├── context/                  # React context providers
│   ├── data/                     # Static data and types
│   ├── home/                     # Homepage components
│   ├── interfaces/               # TypeScript interfaces
│   ├── products/                 # Product pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── lib/                         # Utility libraries
│   ├── auth.ts                  # Authentication helpers
│   ├── blob-storage.ts          # Vercel Blob integration
│   ├── formatters.ts            # Data formatting utilities
│   ├── prisma.ts                # Prisma client setup
│   └── utils.ts                 # General utilities
├── prisma/                      # Database configuration
│   └── schema.prisma            # Database schema
├── scripts/                     # Database management scripts
│   ├── migrate-data.ts          # Data migration
│   ├── seed-demo-data.ts        # Demo data seeding
│   ├── setup-admin.ts           # Admin user setup
│   └── [various other scripts] # Additional utilities
├── public/                      # Static assets
├── middleware.ts                # Route protection middleware
├── components.json              # Shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

## 🗄️ Database Schema

The application uses MongoDB with Prisma ORM. Key models include:

### User Model
```prisma
model User {
  id        String    @id @map("_id")
  email     String    @unique
  role      UserRole  @default(CUSTOMER)
  wishlist  Wishlist?
  cart      Cart?
  orders    Order[]
  createdAt DateTime  @default(now())
}

enum UserRole {
  CUSTOMER
  ADMIN
}
```

### Product Model
```prisma
model Product {
  id                     String    @id @default(auto()) @map("_id") @db.ObjectId
  name                   String
  description            String
  additionalInfo         String?
  priceInCents           Int
  oldPriceInCents        Int?
  discountPercentage     Int?
  images                 String[]  // Vercel Blob URLs
  dimensions             ProductDimensions?
  weight                 Float?
  category               String?
  sku                    String    @unique
  inventory              Int       @default(0)
  isAvailableForPurchase Boolean   @default(true)
  // ... relationships and timestamps
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account
- Vercel account (for blob storage)
- Clerk account (for authentication)

### Environment Setup

Create a `.env.local` file:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Push schema to database
   ```

3. **Seed demo data** (optional):
   ```bash
   npm run seed:demo    # Add sample products
   ```

4. **Set up admin user**:
   ```bash
   npm run setup:admin  # Create admin user
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Management
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Run data migration
- `npm run db:reset` - Reset database with fresh migration

### Demo & Setup
- `npm run seed:demo` - Seed with demo products
- `npm run reset:demo` - Reset demo data
- `npm run setup:demo` - Set up clean demo environment
- `npm run setup:admin` - Set up admin user

## 🔧 Key Features

### Customer Experience
- **Product Browsing**: Homepage with featured products, shop page with filtering
- **Product Details**: Rich product pages with image galleries, specifications
- **Shopping Cart**: Add/remove items, quantity management, persistent cart
- **Wishlist**: Save favorite products, easy cart transfer
- **User Account**: Order history, profile management, authentication

### Admin Panel Features
- **Product Management**: Complete CRUD operations for products
- **Image Upload**: Drag & drop image upload to Vercel Blob storage
- **Inventory Tracking**: Stock levels, availability management
- **Bulk Operations**: Multi-select actions for efficiency
- **User Management**: Role management, order tracking

### Technical Features
- **Server-Side Rendering**: SEO-friendly, fast initial page loads
- **API Routes**: RESTful endpoints for all data operations
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Responsive Design**: Mobile-first approach, works on all devices
- **Performance**: Image optimization, lazy loading, efficient queries

## 🔐 Authentication & Authorization

### User Roles
- **CUSTOMER**: Default role for new users
  - Browse products
  - Add to cart/wishlist
  - Place orders
  - Manage account

- **ADMIN**: Elevated privileges
  - All customer features
  - Product management (CRUD)
  - User management
  - Order management
  - Analytics access

### Protected Routes
- `/admin/*` - Admin-only routes (middleware protected)
- `/account` - Authenticated users only
- `/checkout` - Authenticated users only

### Role Checking
```typescript
// Check if current user is admin
const userIsAdmin = await isAdmin();

// Get current user with role
const user = await getCurrentUser();

// Ensure user exists in database (sync with Clerk)
await ensureUserExists(clerkUserId, email);
```

## 🎨 UI/UX Design

### Design System
- **Typography**: Poppins font family with multiple weights
- **Color Scheme**: Neutral base with accent colors
- **Components**: Consistent design patterns using Shadcn/ui
- **Spacing**: Tailwind CSS utility classes for consistent spacing
- **Responsive**: Mobile-first approach with breakpoint-based design

### Key UI Components
- **Product Cards**: Standardized product display with hover effects
- **Modal System**: Cart modal, add-to-cart confirmation, image galleries
- **Navigation**: Header with mega menu, breadcrumbs, pagination
- **Forms**: Consistent form styling with validation feedback
- **Loading States**: Skeleton loaders, spinners, progressive loading

## 🔧 API Documentation

### Products API

#### GET /api/products
Fetch all products with optional filtering
```typescript
// Response
{
  products: Product[],
  total: number,
  page: number,
  limit: number
}
```

#### GET /api/products/[id]
Fetch single product by ID
```typescript
// Response
{
  product: Product | null
}
```

#### POST /api/products/add
Create new product (Admin only)
```typescript
// Request body
{
  name: string,
  description: string,
  priceInCents: number,
  images: string[],
  category: string,
  inventory: number,
  // ... other product fields
}
```

### Image Upload API

#### POST /api/upload-image
Upload image to Vercel Blob storage
```typescript
// Form data with files
// Response: { urls: string[] }
```

#### DELETE /api/upload-image
Delete image from Vercel Blob storage
```typescript
// Request body: { urls: string[] }
```

## 🚀 Deployment

### Vercel Deployment
1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Configure domains** if using custom domain
4. **Deploy** - automatic deployments on push to main branch

### Environment Variables for Production
```env
DATABASE_URL="mongodb+srv://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Post-Deployment Checklist
- [ ] Database connection verified
- [ ] Admin user created
- [ ] Sample products added
- [ ] Image uploads working
- [ ] Authentication flow tested
- [ ] All pages loading correctly
- [ ] Mobile responsiveness verified

## 🔍 Testing & Quality Assurance

### Manual Testing Flows
1. **User Registration/Login Flow**
2. **Product Browsing Flow**: Homepage → Shop → Product Details
3. **Shopping Cart Flow**: Add to cart → View cart → Checkout
4. **Admin Panel Flow**: Login → Product management → Image upload
5. **Mobile Responsiveness**: Test all flows on mobile devices

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting (optional)
- **Error Boundaries**: Graceful error handling
- **Loading States**: User feedback during async operations

## 🐛 Troubleshooting

### Common Issues & Solutions

#### Database Connection Issues
```bash
# Test database connection
npx prisma studio

# Push schema changes
npm run db:push

# Reset database if needed
npm run db:reset
```

#### Image Upload Issues
- Verify `BLOB_READ_WRITE_TOKEN` is set correctly
- Check Vercel project has blob storage enabled
- Test with small image files first
- Check browser console for CORS errors

#### Authentication Issues
- Verify Clerk environment variables
- Check middleware configuration
- Test with different browsers
- Clear browser cache and cookies

#### Build Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run lint
```

## 📈 Performance Optimization

### Implemented Optimizations
- **Image Optimization**: Next.js Image component with proper sizing
- **Lazy Loading**: Images and components load on demand
- **Database Indexing**: Optimized queries with proper indexes
- **Server-Side Rendering**: Fast initial page loads
- **Code Splitting**: Automatic code splitting with Next.js
- **Caching**: Browser caching for static assets

### Monitoring & Analytics
- Performance monitoring via Vercel Analytics
- Error tracking and logging
- Database query optimization
- Image loading performance

## 🔮 Future Enhancements

### Planned Features
- [ ] **Search & Filtering**: Advanced product search with filters
- [ ] **Reviews & Ratings**: Customer review system
- [ ] **Inventory Alerts**: Low stock notifications
- [ ] **Order Management**: Complete order tracking system
- [ ] **Email Notifications**: Order confirmations, shipping updates
- [ ] **Analytics Dashboard**: Sales and inventory analytics
- [ ] **SEO Optimization**: Meta tags, structured data, sitemap
- [ ] **Multi-language Support**: Internationalization
- [ ] **Payment Integration**: Stripe, PayPal, etc.
- [ ] **Recommendation Engine**: AI-powered product recommendations

### Technical Improvements
- [ ] **Testing Suite**: Unit tests, integration tests, E2E tests
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Monitoring**: Application performance monitoring
- [ ] **Security**: Security headers, input validation, rate limiting
- [ ] **Accessibility**: WCAG compliance, screen reader support

## 📞 Support & Contact

For questions, issues, or contributions:
- **Issues**: Create GitHub issues for bug reports or feature requests
- **Documentation**: Refer to implementation logs and guides in the project
- **Community**: Share knowledge and best practices

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🎊 Project Status: Production Ready

This fullstack e-commerce furniture store is **production ready** with:
- ✅ Complete database integration
- ✅ Admin panel with image uploads
- ✅ User authentication and authorization
- ✅ Responsive design across all devices
- ✅ Error handling and loading states
- ✅ Performance optimizations
- ✅ Cloud storage integration
- ✅ Modern tech stack with TypeScript

**Ready for deployment to Vercel!** 🚀
