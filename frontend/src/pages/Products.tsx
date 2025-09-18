import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productService, Product, Category } from '../services/productService';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log('Products useEffect (categories) running');
    const fetchCategories = async () => {
      try {
        const cats = await productService.getCategories();
        console.log('Fetched categories:', cats);
        console.log('Categories array length:', cats?.length);
        setCategories(cats || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        console.error('Categories error details:', error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    console.log('Products useEffect (products) running, searchParams:', Object.fromEntries(searchParams.entries()));
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const categoryId = searchParams.get('categoryId');
        const page = parseInt(searchParams.get('page') || '1');
        const search = searchParams.get('search') || '';

        setSelectedCategory(categoryId ? parseInt(categoryId) : null);
        setSearchTerm(search);
        setCurrentPage(page);

        console.log('Calling productService.getProducts with:', { page, pageSize: 12, categoryId: categoryId ? parseInt(categoryId) : undefined, searchTerm: search || undefined });
        const response = await productService.getProducts({
          page,
          pageSize: 12,
          categoryId: categoryId ? parseInt(categoryId) : undefined,
          searchTerm: search || undefined
        });
        console.log('Fetched products response:', response);
        console.log('Products array length:', response.products?.length);
        console.log('First product:', response.products?.[0]);
        setProducts(response.products || []);
        setTotalPages(response.totalPages || 0);
        setTotalCount(response.totalCount || 0);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error details:', error);
        setProducts([]);
        setTotalPages(0);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('categoryId', selectedCategory.toString());
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleCategoryChange = (categoryId: number | null) => {
    const params = new URLSearchParams();
    if (categoryId) params.set('categoryId', categoryId.toString());
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', '1');
    setSearchParams(params);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('categoryId', selectedCategory.toString());
    if (searchTerm) params.set('search', searchTerm);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-500"></div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white text-luxury-800 py-16 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-serif font-bold mb-4">Our Collection</h1>
          <p className="text-xl text-luxury-600 font-light">Discover {totalCount} amazing products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl p-8 sticky top-8 shadow-luxury border border-cream-200">
              <h2 className="text-2xl font-serif font-bold text-luxury-800 mb-8">Filters</h2>

              {/* Search */}
              <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-cream-50 text-luxury-800 placeholder-luxury-400 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-gold-500 border border-cream-200"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white p-2 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all duration-300 shadow-luxury"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-serif font-semibold text-luxury-800 mb-6">Categories</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      !selectedCategory
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-premium'
                        : 'text-luxury-600 hover:bg-cream-50 hover:text-gold-600'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-premium'
                          : 'text-luxury-600 hover:bg-cream-50 hover:text-gold-600'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-luxury-500 text-sm font-light bg-cream-50 p-4 rounded-xl">
                Showing {products.length} of {totalCount} products
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-luxury-400 text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-serif font-semibold text-luxury-800 mb-4">No products found</h3>
                <p className="text-luxury-600 font-light">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group border border-cream-200 hover:border-gold-300 shadow-luxury hover:shadow-premium">
                      <Link to={`/products/${product.id}`}>
                        <div className="relative overflow-hidden">
                          <img
                            src={product.mainImageUrl || '/placeholder-product.jpg'}
                            alt={product.name}
                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                          {product.isFeatured && (
                            <div className="absolute top-4 left-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-premium">
                              ⭐ FEATURED
                            </div>
                          )}
                          {product.salePrice && (
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-premium">
                              SALE
                            </div>
                          )}
                        </div>
                        <div className="p-8">
                          <h3 className="font-serif font-semibold text-luxury-800 text-lg mb-3 group-hover:text-gold-600 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                          <p className="text-luxury-500 text-sm mb-4 font-light">{product.category.name}</p>
                          <p className="text-luxury-600 text-sm mb-6 line-clamp-2 font-light leading-relaxed">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-serif font-bold text-gold-600">
                              ${product.salePrice || product.price}
                            </span>
                            {product.salePrice && (
                              <span className="text-sm text-luxury-400 line-through">
                                ${product.price}
                              </span>
                            )}
                          </div>
                          {product.brand && (
                            <p className="text-gold-600 text-sm mt-3 font-medium">Brand: {product.brand}</p>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex justify-center">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-3 bg-white text-luxury-700 rounded-xl hover:bg-cream-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-cream-200 shadow-luxury font-medium"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-premium'
                              : 'bg-white text-luxury-700 hover:bg-cream-50 border border-cream-200 shadow-luxury'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 bg-white text-luxury-700 rounded-xl hover:bg-cream-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-cream-200 shadow-luxury font-medium"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
