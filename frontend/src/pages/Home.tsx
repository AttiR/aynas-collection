import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, Product, Category } from '../services/productService';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          productService.getFeaturedProducts(),
          productService.getCategories()
        ]);
        setFeaturedProducts(products);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-cream-50 to-cream-100 text-luxury-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 to-gold-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent leading-tight">
              Discover Your Style
            </h1>
            <p className="text-lg md:text-xl mb-10 text-luxury-600 max-w-3xl mx-auto font-light leading-relaxed">
              Explore our curated collection of premium clothing and accessories.
              From casual wear to elegant pieces, find your perfect style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 inline-block transform hover:scale-105 shadow-luxury hover:shadow-premium"
              >
                SHOP NOW
              </Link>
              <Link
                to="/products?categoryId=1"
                className="bg-transparent border-2 border-gold-500 text-gold-600 px-8 py-3 rounded-xl font-semibold hover:bg-gold-500 hover:text-white transition-all duration-300 inline-block transform hover:scale-105"
              >
                VIEW T-SHIRTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-800 mb-4">Shop by Category</h2>
            <p className="text-lg text-luxury-600 font-light">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?categoryId=${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 text-center hover:bg-cream-50 transition-all duration-300 transform hover:scale-105 border border-cream-200 hover:border-gold-300 shadow-luxury hover:shadow-premium">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center text-white text-2xl font-serif font-bold shadow-premium group-hover:animate-float">
                    {category.name.charAt(0)}
                  </div>
                  <h3 className="font-serif font-semibold text-luxury-800 text-base group-hover:text-gold-600 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-luxury-500 text-sm font-light">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-800 mb-4">Featured Products</h2>
            <p className="text-lg text-luxury-600 font-light">Handpicked items just for you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group border border-cream-200 hover:border-gold-300 shadow-luxury hover:shadow-premium">
                <Link to={`/products/${product.id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={product.mainImageUrl || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    {product.isFeatured && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-premium">
                        ⭐ FEATURED
                      </div>
                    )}
                    {product.salePrice && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-premium">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-semibold text-luxury-800 text-base mb-2 group-hover:text-gold-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-luxury-500 text-sm mb-3 font-light">{product.category.name}</p>
                    <p className="text-luxury-600 text-sm mb-4 line-clamp-2 font-light leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-serif font-bold text-gold-600">
                        ${product.salePrice || product.price}
                      </span>
                      {product.salePrice && (
                        <span className="text-sm text-luxury-400 line-through">
                          ${product.price}
                        </span>
                      )}
                    </div>
                    {product.brand && (
                      <p className="text-gold-600 text-sm mt-2 font-medium">Brand: {product.brand}</p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-10 py-3 rounded-xl font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-300 inline-block transform hover:scale-105 shadow-luxury hover:shadow-premium"
            >
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-luxury-800 mb-4">Why Choose Us</h2>
            <p className="text-lg text-luxury-600 font-light">We're committed to providing the best shopping experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-cream-50 rounded-2xl p-8 hover:bg-white hover:shadow-premium transition-all duration-300 border border-cream-200">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">Free Shipping</h3>
              <p className="text-luxury-600 font-light leading-relaxed">Free shipping on orders over $50. Fast and reliable delivery to your doorstep.</p>
            </div>
            <div className="text-center bg-cream-50 rounded-2xl p-8 hover:bg-white hover:shadow-premium transition-all duration-300 border border-cream-200">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">Quality Guarantee</h3>
              <p className="text-luxury-600 font-light leading-relaxed">30-day return policy on all items. We stand behind the quality of our products.</p>
            </div>
            <div className="text-center bg-cream-50 rounded-2xl p-8 hover:bg-white hover:shadow-premium transition-all duration-300 border border-cream-200">
              <div className="bg-gradient-to-br from-gold-400 to-gold-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-semibold text-luxury-800 mb-3">24/7 Support</h3>
              <p className="text-luxury-600 font-light leading-relaxed">Round-the-clock customer support. We're here to help whenever you need us.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
