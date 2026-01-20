# 🔐 Authorization System Guide

This project now includes a comprehensive **3-tier role-based authorization system** designed for e-commerce applications.

## 🏗️ **System Architecture**

### **Access Levels:**

1. **🛒 Public Users** (no authentication required)
   - Browse products
   - Add items to cart (local storage)
   - View product details
   - Access public pages (home, shop, blog, contact)

2. **👤 Authenticated Customers** (signed in with `CUSTOMER` role)
   - All public user capabilities
   - Make purchases  
   - View order history at `/account`
   - Manage personal wishlist
   - Persistent cart across devices

3. **🔧 Super Admins** (signed in with `ADMIN` role)
   - Full admin panel access at `/admin`
   - Manage products (create, edit, delete)
   - View all orders and customer data
   - Manage users and promote to admin
   - Access collections and inventory

---

## 🚀 **Quick Setup**

### **1. Update Database Schema**
The system adds a `role` field to users. Run the database migration:

```bash
npx prisma db push
```

### **2. Create Your First Admin User**

**Option A: Via Script (Recommended)**
1. Sign up for an account normally through your app
2. Set your email in environment variables:
   ```bash
   echo "ADMIN_EMAIL=your-email@domain.com" >> .env.local
   ```
3. Run the admin setup script:
   ```bash
   npx tsx scripts/setup-admin.ts
   ```

**Option B: Direct Database Update**
Update the user role directly in your database:
```sql
-- MongoDB (if using MongoDB)
db.User.updateOne(
  { email: "your-email@domain.com" },
  { $set: { role: "ADMIN" } }
)
```

---

## 🛡️ **Security Features**

### **Middleware Protection**
- `/admin/*` routes are automatically protected
- Non-admin users are redirected to `/unauthorized`
- Authentication required before role checking

### **Route Protection**
- ✅ `/` - Public access
- ✅ `/shop`, `/blog`, `/contact` - Public access  
- 🔒 `/account` - Requires authentication
- 🔐 `/admin/*` - Requires ADMIN role
- 🚫 `/unauthorized` - Shown for access violations

### **Navigation Adaptation**
- Header automatically adapts based on user role
- Admin users see admin navigation
- Regular users see customer navigation
- Public users see standard e-commerce navigation

---

## 📱 **User Experience Flow**

### **Customer Journey:**
1. **Browse** → Products visible to all
2. **Sign Up/Login** → Access to `/account`  
3. **Purchase** → Order history tracking
4. **Account** → View orders, manage profile

### **Admin Journey:**
1. **Get Promoted** → Via setup script or database
2. **Access `/admin`** → Full admin panel
3. **Manage** → Products, orders, customers
4. **Quick Switch** → "View Site" button to return to customer view

---

## 🔧 **Configuration Options**

### **Environment Variables**
```bash
# Admin setup
ADMIN_EMAIL=admin@yourdomain.com

# Clerk authentication (existing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### **Role Management**
Promote additional users to admin programmatically:
```typescript
import { promoteToAdmin } from "@/lib/auth";
await promoteToAdmin("user_id_here");
```

---

## 📊 **Database Schema Changes**

### **User Model Enhancement**
```prisma
model User {
  id           String    @id @default(auto()) @map("_id") @db.ObjectId
  email        String    @unique
  role         UserRole  @default(CUSTOMER) // ← NEW
  // ... other fields
}

enum UserRole {
  CUSTOMER  // Default for new signups
  ADMIN     // Full admin access
}
```

---

## 🔍 **Testing the System**

### **Test Customer Access:**
1. Sign up with a new email
2. Verify role defaults to `CUSTOMER`
3. Try accessing `/admin` → Should redirect to `/unauthorized`
4. Access `/account` → Should show order history

### **Test Admin Access:**
1. Promote account using setup script
2. Access `/admin` → Should show admin dashboard
3. Try admin features (manage products, view users)
4. Use "View Site" to switch back to customer view

---

## 🎯 **Key Benefits**

✅ **Minimal Code Changes** - Built on existing Clerk authentication  
✅ **Scalable Architecture** - Easy to add more roles in the future  
✅ **Security First** - Middleware-level protection  
✅ **Great UX** - Seamless navigation adaptation  
✅ **Easy Management** - Simple scripts for admin promotion  

---

## 🐛 **Troubleshooting**

**Problem: "Access Denied" for admin user**
- Verify role in database: Check if user has `ADMIN` role
- Check middleware logs for role verification errors
- Ensure database connection is working

**Problem: Customer can't access /account**  
- Verify user is signed in with Clerk
- Check if user exists in your database
- Look for authentication errors in browser console

**Problem: Navigation not updating**
- Clear browser cache and cookies
- Check if Header component is receiving correct route context
- Verify imports are working for navigation config

---

## 🚀 **Next Steps**

Consider adding these enhancements:
- **Super Admin role** for multi-admin management
- **Store Manager role** for limited admin access  
- **Email notifications** for role changes
- **Audit logging** for admin actions
- **Role-based API permissions**

---

**The system is now production-ready with secure, role-based access control! 🎉**
