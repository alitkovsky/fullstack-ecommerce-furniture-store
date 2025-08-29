# 🚀 Fullstack E-commerce Furniture Store - Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fullstack-ecommerce-furniture-store)

**Live Demo:** [Your Deployed URL Here]

A modern, full-stack e-commerce application built with Next.js, featuring role-based authentication, admin panel, and a complete shopping experience.

---

## 🎮 **Try the Live Demo**

### 🔑 **Demo Accounts** 

**Admin Account (Full Access):**
```
Email: admin@demo.com
Password: [Pre-configured in Clerk - just sign in!]
```
*Features: Admin dashboard, product management, order management, user management*

**Customer Account (Shopping Experience):**
```
Email: customer@demo.com  
Password: [Pre-configured in Clerk - just sign in!]
```
*Features: Shopping, order history ($2,309.95 in sample orders), wishlist, account management*

> **Note:** Click the floating "Demo Accounts" button on the site to copy credentials easily!

---

## 🌟 **What You'll Find in the Demo**

### 🛍️ **Customer Experience**
- **20+ Sample Products** - Furniture items with realistic pricing
- **Shopping Cart & Wishlist** - Full e-commerce functionality  
- **Order History** - View past purchases and order details
- **User Dashboard** - Account management at `/account`
- **Responsive Design** - Works perfectly on mobile and desktop

### 🔧 **Admin Experience**  
- **Admin Dashboard** - Overview of sales and metrics at `/admin`
- **Product Management** - Add, edit, and delete products
- **Order Management** - View all customer orders
- **User Management** - See customer list with purchase history
- **3 Sample Orders** - Realistic transaction data for customer@demo.com
- **Clean Demo Environment** - Focused on essential functionality

### 🏗️ **Technical Features**
- **Role-Based Access Control** - Secure admin/customer separation
- **Modern UI/UX** - Built with Tailwind CSS and shadcn/ui
- **Database Integration** - MongoDB with Prisma ORM
- **Authentication** - Clerk.dev integration
- **File Storage** - Cloud-based image management
- **Type Safety** - Full TypeScript implementation

---

## 🚀 **Quick Demo Guide**

### **1. Browse as Guest**
- Visit the homepage to see featured products
- Browse the `/shop` to see all products
- Add items to cart (stored locally)

### **2. Try Customer Account**
- **Sign in** with `customer@demo.com` (no signup needed!)
- View your personal dashboard at `/account`
- See sample order history with 3 orders totaling $2,309.95
- Add items to wishlist

### **3. Access Admin Panel**
- **Sign in** with `admin@demo.com` (no signup needed!)
- Navigate to `/admin` for full admin access
- View customer orders, manage products
- See comprehensive sales data

---

## 🛠️ **Tech Stack**

| Category | Technology |
|----------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | MongoDB |
| **Auth** | Clerk.dev |
| **Storage** | Cloud Storage (Images) |
| **Deployment** | Vercel |

---

## 📊 **Demo Data Overview**

The demo includes:
- ✅ **4 Users** (Essential demo accounts only)
- ✅ **5 Products** (Furniture items with realistic data)
- ✅ **3 Sample Orders** (All linked to customer@demo.com)  
- ✅ **5 Order Items** (Various quantities and combinations)
- ✅ **Realistic Pricing** (Market-accurate furniture prices)
- ✅ **Order History** (Sample data totaling $2,309.95)

---

## 🔄 **Reset Demo Data**

If you're running this locally and want to reset the demo data:

```bash
# Install dependencies
npm install

# Set up database
npx prisma db push

# Seed with clean demo data
npx tsx scripts/setup-clean-demo.ts
```

---

## 🚚 **Deployment Instructions**

### **Deploy to Vercel (Recommended)**

1. **Clone and Deploy:**
   ```bash
   git clone https://github.com/yourusername/fullstack-ecommerce-furniture-store
   cd fullstack-ecommerce-furniture-store
   vercel deploy
   ```

2. **Environment Variables:**
   Set these in your Vercel dashboard:
   ```
   DATABASE_URL=your_mongodb_connection_string
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

3. **Seed Demo Data:**
   ```bash
   npx tsx scripts/setup-clean-demo.ts
   ```

### **Local Development**

1. **Setup:**
   ```bash
   git clone https://github.com/yourusername/fullstack-ecommerce-furniture-store
   cd fullstack-ecommerce-furniture-store
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp .env.example .env.local
   # Add your MongoDB and Clerk credentials
   ```

3. **Database & Demo Data:**
   ```bash
   npx prisma db push
   npx tsx scripts/setup-clean-demo.ts
   npm run dev
   ```

---

## 📱 **Mobile Experience**

The demo is fully responsive! Try it on:
- 📱 **Mobile** - Touch-friendly shopping experience
- 💻 **Desktop** - Full admin panel functionality  
- 🖥️ **Tablet** - Optimized layouts for all screen sizes

---

## 🎯 **Key Demo Features to Try**

### **As a Customer:**
- [x] Browse products and view details
- [x] Add items to cart and proceed to checkout
- [x] View order history in account dashboard
- [x] Manage wishlist items
- [x] Experience responsive mobile design

### **As an Admin:**
- [x] View sales dashboard and metrics
- [x] Manage product inventory
- [x] Review customer orders and data  
- [x] Navigate admin-only sections
- [x] Test role-based access control

---

## 🤝 **Contributing**

This is a demonstration project, but contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **About the Developer**

Built by [Your Name] as a demonstration of modern full-stack development practices.

**Connect with me:**
- 🐙 [GitHub](https://github.com/yourusername)
- 💼 [LinkedIn](https://linkedin.com/in/yourusername)  
- 🐦 [Twitter](https://twitter.com/yourusername)

---

**🎉 Enjoy exploring the demo! Feel free to test all features and provide feedback.**
