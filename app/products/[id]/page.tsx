"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useData } from "@/app/context/AppContext";
import { formatCurrency } from "@/lib/formatters";

interface Product {
  id: string;
  name: string;
  description: string;
  additionalInfo?: string;
  priceInCents: number;
  oldPriceInCents?: number;
  discountPercentage?: number;
  images: string[];
  imagePath?: string;
  isNew: boolean;
  isAvailableForPurchase: boolean;
  inventory: number;
  category?: string;
  collectionIDs: string[];
  tag: string[];
  sku: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: string;
  updatedAt: string;
}

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {
    addToWishlist,
    isInWishlist,
    removeFromWishlist,
    setToggleCartModal,
    setProductForModal
  } = useData();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id || Array.isArray(params.id)) {
        setError('Invalid product ID');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      setProductForModal({ ...product, quantity });
      setToggleCartModal(true);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist({ product })) {
        removeFromWishlist({ product });
      } else {
        addToWishlist({ product });
      }
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined" && product) {
      const shareLink = `${window.location.origin}/products/${product.id}`;
      if (navigator.share) {
        navigator.share({
          title: product.name,
          text: product.description,
          url: shareLink,
        });
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareLink);
        alert('Product link copied to clipboard!');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
              <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/shop" 
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">Product Not Found</h1>
          <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
          <Link 
            href="/shop" 
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
            <li>›</li>
            <li><Link href="/shop" className="hover:text-gray-700">Shop</Link></li>
            <li>›</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[currentImageIndex] || "/assets/img/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-ochre' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.description}</p>
              {product.additionalInfo && (
                <p className="text-sm text-gray-500 mt-2">{product.additionalInfo}</p>
              )}
            </div>

            {/* Price and Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                  {formatCurrency(product.priceInCents / 100)}
                </span>
                {product.oldPriceInCents && product.oldPriceInCents > 0 && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatCurrency(product.oldPriceInCents / 100)}
                  </span>
                )}
              </div>
              {product.discountPercentage && (
                <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                  -{product.discountPercentage}% OFF
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  New
                </span>
              )}
            </div>

            {/* Product Meta */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">SKU:</span>
                <span className="ml-2 text-gray-600">{product.sku}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Category:</span>
                <span className="ml-2 text-gray-600">{product.category || 'Furniture'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Availability:</span>
                <span className={`ml-2 ${product.inventory > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inventory > 0 ? `In Stock (${product.inventory})` : 'Out of Stock'}
                </span>
              </div>
              {product.weight && (
                <div>
                  <span className="font-medium text-gray-700">Weight:</span>
                  <span className="ml-2 text-gray-600">{product.weight} kg</span>
                </div>
              )}
            </div>

            {/* Dimensions */}
            {product.dimensions && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Dimensions</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Length:</span>
                    <span className="ml-1 font-medium">{product.dimensions.length} cm</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Width:</span>
                    <span className="ml-1 font-medium">{product.dimensions.width} cm</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Height:</span>
                    <span className="ml-1 font-medium">{product.dimensions.height} cm</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            {product.tag && product.tag.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tag.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.inventory}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.isAvailableForPurchase || product.inventory === 0}
                  className="flex-1 bg-ochre text-white py-3 px-6 rounded hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
                >
                  {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`px-4 py-3 border border-gray-300 rounded hover:border-gray-400 transition-colors ${
                    isInWishlist({ product }) ? 'bg-red-50 border-red-300' : ''
                  }`}
                >
                  {isInWishlist({ product }) ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-4 py-3 border border-gray-300 rounded hover:border-gray-400 transition-colors"
                >
                  📤
                </button>
              </div>
            </div>

            {/* Back to Shop */}
            <div className="pt-6">
              <Link 
                href="/shop"
                className="inline-flex items-center text-ochre hover:text-ochre-dark transition-colors"
              >
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
