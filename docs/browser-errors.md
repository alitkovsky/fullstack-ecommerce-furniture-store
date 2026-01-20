## Error Type
Runtime ClerkRuntimeError

## Error Message
Clerk: Failed to load Clerk, failed to load script: https://suited-amoeba-28.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js

(code="failed_to_load_clerk_js")



Next.js version: 16.1.4 (Turbopack)

## Error Type
Runtime Error

## Error Message
Image with src "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=400&fit=crop" is missing required "width" property.


    at CartModalItem (app/components/cart/CartModalItem/index.tsx:13:17)
    at <unknown> (app/components/CartModal/index.tsx:61:41)
    at Array.map (<anonymous>:null:null)
    at CartModal (app/components/CartModal/index.tsx:61:32)
    at RootLayout (app/layout.tsx:62:19)

## Code Frame
  11 |         <div className="flex items-center justify-between">
  12 |             <div className="flex items-center gap-8">
> 13 |                 <Image loading="lazy" className='bg-[#B88E2F38] rounded-lg w-24 h-24 object-cover' src={p?.product?.image} alt={p?.product?.title + "_img"} />
     |                 ^
  14 |                 <div className="flex flex-col gap-2">
  15 |                     <Link onClick={() => setIsCartOpen(false)} href={`/products/${p?.product?.id}`}>{p?.product?.title} <span className="text-gray-400">({p.features.color}/{p.features.size})</span></Link>
  16 |                     <div className="text-xs flex items-center gap-3">

Next.js version: 16.1.4 (Turbopack)

## Error Type
Console Error

## Error Message
ClerkRuntimeError: Clerk: Failed to load Clerk

(code="failed_to_load_clerk_js_timeout")


    at handleTimeout (http://localhost:3000/_next/static/chunks/node_modules_%40clerk_shared_dist_runtime_51e06ad5._.js:5348:50)

Next.js version: 16.1.4 (Turbopack)
