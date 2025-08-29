# 🎪 Demo Guide - Test Your E-Commerce Store

## 🌐 Working URLs (Local Development)

Since your dev server is running on `http://localhost:3000`, you can test these URLs:

### 🏠 User-Facing Pages
- **Homepage**: http://localhost:3000/
- **Shop Page**: http://localhost:3000/shop
- **Product Detail Examples**:
  - Syltherine Chair: http://localhost:3000/products/689de4ed6928c9e0f24ba4eb
  - Sectional Sofa: http://localhost:3000/products/689de59a8203710cea7de437
  - Oak Dining Table: http://localhost:3000/products/689de59a8203710cea7de438

### 🔧 Admin Panel
- **Admin Dashboard**: http://localhost:3000/admin
- **Products Management**: http://localhost:3000/admin/products
- **Add New Product**: http://localhost:3000/admin/products/new

### 🔌 API Endpoints
- **All Products**: http://localhost:3000/api/products
- **Single Product**: http://localhost:3000/api/products/689de4ed6928c9e0f24ba4eb

## 🧪 Testing Flow

### 1. Homepage Test
1. Visit http://localhost:3000/
2. Scroll to "Our Products" section
3. Verify products load from database
4. Click "Show More" button

### 2. Shop Page Test
1. Should redirect to http://localhost:3000/shop
2. Verify all 11 products display
3. Check product cards show correct pricing
4. Test product hover effects

### 3. Product Detail Test
1. Click any product card
2. Verify product detail page loads
3. Test quantity selector (+/- buttons)
4. Test add to cart functionality
5. Test wishlist toggle
6. Test share button
7. Click "← Back to Shop"

### 4. Admin Panel Test (If you have Clerk authentication)
1. Visit http://localhost:3000/admin/products
2. View all products in admin table
3. Click "Add Product" to test creation
4. Test bulk operations (select multiple products)
5. Test edit functionality

## 📊 Database Products

You currently have these products in your database:

### Living Room (3 products)
- **Syltherine** - $25.00 (was $35.00, 30% off)
- **Levitan Sectional Sofa** - $1,299.00 (was $1,499.00, 13% off) 🆕
- **Velvet Accent Chair** - $459.00
- **Rustic Coffee Table** - $399.00

### Bedroom (2 products)
- **Memory Foam Mattress Queen** - $799.00 (was $999.00, 20% off)
- **Floating Nightstand Set** - $189.00

### Office (2 products)
- **Industrial Bookshelf** - $249.00 🆕
- **Standing Desk Converter** - $329.00 🆕

### Dining Room (1 product)
- **Oak Dining Table** - $899.00

### General Furniture (3 products)
- **Grifo** - $15.00 (Night lamp)
- **Muggo** - $20.00 (Small mug) 🆕

## 🎯 Key Features to Test

### Product Cards
- ✅ Proper price formatting with currency symbols
- ✅ Discount badges and "New" badges
- ✅ Hover effects with action buttons
- ✅ Click to navigate to detail page

### Product Detail Pages
- ✅ Full product information display
- ✅ Image gallery (when multiple images available)
- ✅ Quantity selector with inventory limits
- ✅ Add to cart functionality
- ✅ Wishlist integration
- ✅ Share functionality
- ✅ Breadcrumb navigation

### Admin Features
- ✅ Create new products with image upload
- ✅ Edit existing products
- ✅ Bulk operations (activate/deactivate multiple)
- ✅ Delete products with confirmation
- ✅ Form validation and error handling

## 🚨 Troubleshooting

### If Something Doesn't Work

1. **Check Console**: Open browser dev tools and check for errors
2. **Server Logs**: Check the terminal where you ran `npm run dev`
3. **Database**: Run `npx prisma studio` to view database contents
4. **API**: Test endpoints directly in browser or with curl

### Common Issues

- **404 on Product Detail**: Make sure you're using the correct MongoDB ObjectId
- **Images Not Loading**: Check that placeholder images exist in `/public/assets/img/products/`
- **Admin Panel**: Ensure Clerk authentication is set up correctly

## 🎉 Congratulations!

Your e-commerce store migration is complete and fully functional! The modern database-driven architecture provides a solid foundation for future enhancements and scalability.
