import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService, Product } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import SEO from '../components/SEO';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const productData = await productService.getProduct(parseInt(id));
        setProduct(productData);
        if (productData?.size) {
          setSelectedSize(productData.size);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      imageUrl: product.mainImageUrl,
      quantity,
      size: selectedSize || product.size || 'M'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-luxury-400 text-8xl mb-6">😞</div>
          <h3 className="text-2xl font-serif font-semibold text-luxury-800 mb-4">Product not found</h3>
          <p className="text-luxury-600 mb-8 font-light">The product you're looking for doesn't exist.</p>
          <Link
            to="/products"
            className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury hover:shadow-premium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {product && (
        <SEO 
          title={product.name}
          description={product.description || `Shop ${product.name} at Aynas Collection. ${product.brand ? `Brand: ${product.brand}. ` : ''}Price: $${product.price}. ${product.material ? `Material: ${product.material}. ` : ''}Available in ${product.color || 'various colors'}.`}
          image={product.mainImageUrl}
          url={`/products/${product.id}`}
          type="product"
          keywords={`${product.name}, ${product.brand}, ${product.category?.name}, fashion, clothing, ${product.color}, ${product.material}, Aynas Collection`}
          product={{
            name: product.name,
            price: product.salePrice || product.price,
            description: product.description || `Shop ${product.name} at Aynas Collection`,
            image: product.mainImageUrl || '',
            brand: product.brand || 'Aynas Collection',
            availability: product.stockQuantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
          }}
        />
      )}
      <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white text-luxury-800 py-6 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-3 text-sm font-medium">
            <Link to="/" className="text-luxury-500 hover:text-gold-600 transition-colors">
              Home
            </Link>
            <span className="text-luxury-400">/</span>
            <Link to="/products" className="text-luxury-500 hover:text-gold-600 transition-colors">
              Products
            </Link>
            <span className="text-luxury-400">/</span>
            <span className="text-luxury-800">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-luxury border border-cream-200">
              <img
                src={product.mainImageUrl || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover"
              />
            </div>
            {product.isFeatured && (
              <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-3 rounded-xl text-center font-semibold shadow-premium">
                ⭐ Featured Product
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-luxury-800 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-luxury-600 mb-6 font-light">
                {product.category.name}
              </p>
              <div className="flex items-center space-x-6 mb-8">
                <span className="text-4xl font-serif font-bold text-gold-600">
                  ${product.salePrice || product.price}
                </span>
                {product.salePrice && (
                  <span className="text-2xl text-luxury-400 line-through">
                    ${product.price}
                  </span>
                )}
                {product.salePrice && (
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-premium">
                    Save ${(product.price - product.salePrice).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-luxury border border-cream-200">
              <p className="text-luxury-700 leading-relaxed text-lg font-light">
                {product.description}
              </p>

              {/* Product Specifications */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-cream-200">
                {product.brand && (
                  <div>
                    <span className="text-luxury-500 text-sm font-medium">Brand:</span>
                    <p className="text-gold-600 font-semibold text-lg">{product.brand}</p>
                  </div>
                )}
                {product.material && (
                  <div>
                    <span className="text-luxury-500 text-sm font-medium">Material:</span>
                    <p className="text-luxury-800 text-lg">{product.material}</p>
                  </div>
                )}
                {product.color && (
                  <div>
                    <span className="text-luxury-500 text-sm font-medium">Color:</span>
                    <p className="text-luxury-800 text-lg">{product.color}</p>
                  </div>
                )}
                {product.size && (
                  <div>
                    <span className="text-luxury-500 text-sm font-medium">Size:</span>
                    <p className="text-luxury-800 text-lg">{product.size}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-luxury border border-cream-200">
              <h3 className="text-2xl font-serif font-semibold text-luxury-800">Add to Cart</h3>

              {/* Size Selection */}
              {product.size && (
                <div>
                  <label className="block text-luxury-700 text-sm font-medium mb-3">
                    Size
                  </label>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-cream-50 text-luxury-800 border border-cream-200 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gold-500 font-medium"
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
              )}

              {/* Quantity Selection */}
              <div>
                <label className="block text-luxury-700 text-sm font-medium mb-3">
                  Quantity
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-cream-100 text-luxury-700 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-gold-50 transition-all duration-300 font-semibold"
                  >
                    -
                  </button>
                  <span className="text-luxury-800 font-semibold text-xl min-w-[4rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-cream-100 text-luxury-700 w-12 h-12 rounded-xl flex items-center justify-center hover:bg-gold-50 transition-all duration-300 font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${product.stockQuantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stockQuantity > 0
                    ? `${product.stockQuantity} in stock`
                    : 'Out of stock'
                  }
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-5 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 disabled:bg-luxury-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 shadow-luxury hover:shadow-premium transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span>Add to Cart</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-2xl p-8 shadow-luxury border border-cream-200">
              <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-6">Product Information</h3>
              <div className="space-y-4 text-sm text-luxury-600">
                <div className="flex justify-between items-center py-2 border-b border-cream-100">
                  <span className="font-medium">SKU:</span>
                  <span className="text-gold-600 font-semibold">AYN-{product.id.toString().padStart(3, '0')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-cream-100">
                  <span className="font-medium">Category:</span>
                  <span className="text-luxury-800">{product.category.name}</span>
                </div>
                {product.brand && (
                  <div className="flex justify-between items-center py-2 border-b border-cream-100">
                    <span className="font-medium">Brand:</span>
                    <span className="text-gold-600 font-semibold">{product.brand}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default ProductDetail;
