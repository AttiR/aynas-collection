import api from './api';

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  salePrice?: number;
  stockQuantity: number;
  brand?: string;
  material?: string;
  size?: string;
  color?: string;
  mainImageUrl?: string;
  imageUrls: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface ProductFilter {
  searchTerm?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  size?: string;
  color?: string;
  isFeatured?: boolean;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  pageSize?: number;
}

export interface ProductListResponse {
  products: Product[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

class ProductService {
  async getProducts(filter: ProductFilter = {}): Promise<ProductListResponse> {
    try {
      const response = await api.get<ProductListResponse>('/products', { params: filter });
      return response.data;
    } catch (error) {
      console.warn('Products API not available, using fallback data');
      // Fallback products for local development - Full catalog
      const fallbackProducts = [
        {
          id: 1,
          name: "Classic Cotton T-Shirt",
          description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear with a modern, relaxed silhouette.",
          price: 29.99,
          salePrice: undefined,
          stockQuantity: 100,
          brand: "Aynas",
          material: "100% Cotton",
          size: "M",
          color: "White",
          mainImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
        },
        {
          id: 2,
          name: "Premium V-Neck T-Shirt",
          description: "Elegant v-neck t-shirt made from premium cotton. Perfect for both casual and semi-formal occasions.",
          price: 34.99,
          salePrice: undefined,
          stockQuantity: 75,
          brand: "Aynas",
          material: "100% Organic Cotton",
          size: "L",
          color: "Navy Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
        },
        {
          id: 3,
          name: "Graphic Print T-Shirt",
          description: "Stylish graphic t-shirt with unique artwork. Made from soft, breathable cotton for maximum comfort.",
          price: 39.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "100% Cotton",
          size: "S",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
        },
        {
          id: 4,
          name: "Slim Fit Jeans",
          description: "Modern slim fit jeans with stretch comfort. Available in multiple washes with a contemporary fit.",
          price: 79.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "98% Cotton, 2% Elastane",
          size: "32",
          color: "Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
        },
        {
          id: 5,
          name: "Classic Straight Leg Jeans",
          description: "Timeless straight leg jeans with a comfortable fit. Perfect for any casual occasion.",
          price: 69.99,
          salePrice: undefined,
          stockQuantity: 60,
          brand: "Aynas",
          material: "100% Cotton",
          size: "34",
          color: "Dark Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
        },
        {
          id: 6,
          name: "High-Waist Skinny Jeans",
          description: "Fashionable high-waist skinny jeans with a flattering fit. Made from premium denim with stretch.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 40,
          brand: "Aynas",
          material: "95% Cotton, 5% Elastane",
          size: "30",
          color: "Light Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
        },
        {
          id: 7,
          name: "Elegant Evening Dress",
          description: "Stunning evening dress perfect for special occasions. Features a flattering silhouette and premium fabric.",
          price: 149.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Silk Blend",
          size: "M",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
        },
        {
          id: 8,
          name: "Summer Floral Dress",
          description: "Beautiful floral print dress perfect for summer days. Lightweight and comfortable with a feminine design.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 35,
          brand: "Aynas",
          material: "Cotton Blend",
          size: "S",
          color: "Floral Print",
          mainImageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
        },
        {
          id: 9,
          name: "Casual Maxi Dress",
          description: "Comfortable maxi dress for everyday wear. Features a relaxed fit and breathable fabric.",
          price: 69.99,
          salePrice: undefined,
          stockQuantity: 45,
          brand: "Aynas",
          material: "Rayon Blend",
          size: "L",
          color: "Navy",
          mainImageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
        },
        {
          id: 10,
          name: "Classic Denim Jacket",
          description: "Timeless denim jacket with a modern fit. Perfect for layering and adding style to any outfit.",
          price: 99.99,
          salePrice: undefined,
          stockQuantity: 30,
          brand: "Aynas",
          material: "100% Cotton Denim",
          size: "M",
          color: "Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
        },
        {
          id: 11,
          name: "Leather Biker Jacket",
          description: "Premium leather biker jacket with classic styling. Features quality hardware and comfortable fit.",
          price: 299.99,
          salePrice: undefined,
          stockQuantity: 20,
          brand: "Aynas",
          material: "Genuine Leather",
          size: "L",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
        },
        {
          id: 12,
          name: "Casual Blazer",
          description: "Versatile casual blazer perfect for work or social occasions. Features a modern cut and comfortable fit.",
          price: 129.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Wool Blend",
          size: "S",
          color: "Gray",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
        },
        {
          id: 13,
          name: "Classic Sneakers",
          description: "Comfortable and stylish sneakers perfect for everyday wear. Made with premium materials for durability.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "Canvas & Rubber",
          size: "9",
          color: "White",
          mainImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
        },
        {
          id: 14,
          name: "Leather Boots",
          description: "Premium leather boots with classic styling. Perfect for both casual and formal occasions.",
          price: 149.99,
          salePrice: undefined,
          stockQuantity: 30,
          brand: "Aynas",
          material: "Genuine Leather",
          size: "10",
          color: "Brown",
          mainImageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
        },
        {
          id: 15,
          name: "Running Shoes",
          description: "High-performance running shoes with advanced cushioning and breathable design.",
          price: 119.99,
          salePrice: undefined,
          stockQuantity: 40,
          brand: "Aynas",
          material: "Mesh & Synthetic",
          size: "8",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
        },
        {
          id: 16,
          name: "Classic Pullover Hoodie",
          description: "Comfortable pullover hoodie made from soft cotton blend. Perfect for casual wear.",
          price: 59.99,
          salePrice: undefined,
          stockQuantity: 45,
          brand: "Aynas",
          material: "80% Cotton, 20% Polyester",
          size: "M",
          color: "Gray",
          mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
        },
        {
          id: 17,
          name: "Zip-Up Hoodie",
          description: "Versatile zip-up hoodie with kangaroo pocket. Great for layering and easy on/off.",
          price: 69.99,
          salePrice: undefined,
          stockQuantity: 35,
          brand: "Aynas",
          material: "Fleece",
          size: "L",
          color: "Navy",
          mainImageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
        },
        {
          id: 18,
          name: "Oversized Hoodie",
          description: "Trendy oversized hoodie with relaxed fit. Perfect for a comfortable, casual look.",
          price: 79.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Cotton Blend",
          size: "XL",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
        },
        {
          id: 19,
          name: "A-Line Skirt",
          description: "Classic A-line skirt with a flattering silhouette. Perfect for both casual and formal occasions.",
          price: 49.99,
          salePrice: undefined,
          stockQuantity: 30,
          brand: "Aynas",
          material: "Cotton Blend",
          size: "M",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
        },
        {
          id: 20,
          name: "Pleated Mini Skirt",
          description: "Trendy pleated mini skirt with a modern design. Great for a youthful, fashionable look.",
          price: 39.99,
          salePrice: undefined,
          stockQuantity: 40,
          brand: "Aynas",
          material: "Polyester",
          size: "S",
          color: "Plaid",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
        },
        {
          id: 21,
          name: "Maxi Skirt",
          description: "Elegant maxi skirt perfect for special occasions. Features a flowing design and comfortable fit.",
          price: 69.99,
          salePrice: undefined,
          stockQuantity: 20,
          brand: "Aynas",
          material: "Chiffon",
          size: "L",
          color: "Floral",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
        },
        {
          id: 22,
          name: "Leather Handbag",
          description: "Elegant leather handbag with multiple compartments. Perfect for everyday use.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Genuine Leather",
          size: "One Size",
          color: "Brown",
          mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
        },
        {
          id: 23,
          name: "Silk Scarf",
          description: "Luxurious silk scarf with beautiful patterns. Adds elegance to any outfit.",
          price: 39.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "100% Silk",
          size: "One Size",
          color: "Multicolor",
          mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
        },
        {
          id: 24,
          name: "Gold Chain Necklace",
          description: "Elegant gold chain necklace perfect for special occasions. Made with high-quality materials.",
          price: 79.99,
          salePrice: undefined,
          stockQuantity: 35,
          brand: "Aynas",
          material: "Gold Plated",
          size: "One Size",
          color: "Gold",
          mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
        }
      ];

      // Apply filtering based on the filter parameters
      let filteredProducts = fallbackProducts;

      // Filter by category if specified
      if (filter.categoryId) {
        filteredProducts = filteredProducts.filter(product => product.category.id === filter.categoryId);
      }

      // Filter by search term if specified
      if (filter.searchTerm) {
        const searchLower = filter.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.name.toLowerCase().includes(searchLower)
        );
      }

      // Apply pagination
      const page = filter.page || 1;
      const pageSize = filter.pageSize || 12;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        products: paginatedProducts,
        totalCount: filteredProducts.length,
        page: page,
        pageSize: pageSize,
        totalPages: Math.ceil(filteredProducts.length / pageSize)
      };
    }
  }

  async getProduct(id: number): Promise<Product> {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Product API not available, using fallback data');
      // Fallback product for local development - Full catalog
      const fallbackProducts = [
        {
          id: 1,
          name: "Classic Cotton T-Shirt",
          description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear with a modern, relaxed silhouette.",
          price: 29.99,
          salePrice: undefined,
          stockQuantity: 100,
          brand: "Aynas",
          material: "100% Cotton",
          size: "M",
          color: "White",
          mainImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
        },
        {
          id: 2,
          name: "Premium V-Neck T-Shirt",
          description: "Elegant v-neck t-shirt made from premium cotton. Perfect for both casual and semi-formal occasions.",
          price: 34.99,
          salePrice: undefined,
          stockQuantity: 75,
          brand: "Aynas",
          material: "100% Organic Cotton",
          size: "L",
          color: "Navy Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
        },
        {
          id: 3,
          name: "Graphic Print T-Shirt",
          description: "Stylish graphic t-shirt with unique artwork. Made from soft, breathable cotton for maximum comfort.",
          price: 39.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "100% Cotton",
          size: "S",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
        },
        {
          id: 4,
          name: "Slim Fit Jeans",
          description: "Modern slim fit jeans with stretch comfort. Available in multiple washes with a contemporary fit.",
          price: 79.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "98% Cotton, 2% Elastane",
          size: "32",
          color: "Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
        },
        {
          id: 5,
          name: "Classic Straight Leg Jeans",
          description: "Timeless straight leg jeans with a comfortable fit. Perfect for any casual occasion.",
          price: 69.99,
          salePrice: undefined,
          stockQuantity: 60,
          brand: "Aynas",
          material: "100% Cotton",
          size: "34",
          color: "Dark Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
        },
        {
          id: 6,
          name: "High-Waist Skinny Jeans",
          description: "Fashionable high-waist skinny jeans with a flattering fit. Made from premium denim with stretch.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 40,
          brand: "Aynas",
          material: "95% Cotton, 5% Elastane",
          size: "30",
          color: "Light Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
        },
        {
          id: 7,
          name: "Elegant Evening Dress",
          description: "Stunning evening dress perfect for special occasions. Features a flattering silhouette and premium fabric.",
          price: 149.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Silk Blend",
          size: "M",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
        },
        {
          id: 8,
          name: "Summer Floral Dress",
          description: "Beautiful floral print dress perfect for summer days. Lightweight and comfortable with a feminine design.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 35,
          brand: "Aynas",
          material: "Cotton Blend",
          size: "S",
          color: "Floral Print",
          mainImageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
        },
        {
          id: 9,
          name: "Casual Maxi Dress",
          description: "Comfortable maxi dress for everyday wear. Features a relaxed fit and breathable fabric.",
          price: 69.99,
          salePrice: undefined,
          stockQuantity: 45,
          brand: "Aynas",
          material: "Rayon Blend",
          size: "L",
          color: "Navy",
          mainImageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
        },
        {
          id: 10,
          name: "Classic Denim Jacket",
          description: "Timeless denim jacket with a modern fit. Perfect for layering and adding style to any outfit.",
          price: 99.99,
          salePrice: undefined,
          stockQuantity: 30,
          brand: "Aynas",
          material: "100% Cotton Denim",
          size: "M",
          color: "Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
        },
        {
          id: 11,
          name: "Leather Biker Jacket",
          description: "Premium leather biker jacket with classic styling. Features quality hardware and comfortable fit.",
          price: 299.99,
          salePrice: undefined,
          stockQuantity: 20,
          brand: "Aynas",
          material: "Genuine Leather",
          size: "L",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
        },
        {
          id: 12,
          name: "Casual Blazer",
          description: "Versatile casual blazer perfect for work or social occasions. Features a modern cut and comfortable fit.",
          price: 129.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Wool Blend",
          size: "S",
          color: "Gray",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
        },
        {
          id: 13,
          name: "Classic Sneakers",
          description: "Comfortable and stylish sneakers perfect for everyday wear. Made with premium materials for durability.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "Canvas & Rubber",
          size: "9",
          color: "White",
          mainImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
        },
        {
          id: 14,
          name: "Leather Boots",
          description: "Premium leather boots with classic styling. Perfect for both casual and formal occasions.",
          price: 149.99,
          salePrice: undefined,
          stockQuantity: 30,
          brand: "Aynas",
          material: "Genuine Leather",
          size: "10",
          color: "Brown",
          mainImageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
        },
        {
          id: 15,
          name: "Running Shoes",
          description: "High-performance running shoes with advanced cushioning and breathable design.",
          price: 119.99,
          salePrice: undefined,
          stockQuantity: 40,
          brand: "Aynas",
          material: "Mesh & Synthetic",
          size: "8",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
        },
        {
          id: 16,
          name: "Classic Pullover Hoodie",
          description: "Comfortable pullover hoodie made from soft cotton blend. Perfect for casual wear.",
          price: 59.99,
          salePrice: undefined,
          stockQuantity: 45,
          brand: "Aynas",
          material: "80% Cotton, 20% Polyester",
          size: "M",
          color: "Gray",
          mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
        },
        {
          id: 17,
          name: "Zip-Up Hoodie",
          description: "Versatile zip-up hoodie with kangaroo pocket. Great for layering and easy on/off.",
          price: 69.99,
          salePrice: undefined,
          stockQuantity: 35,
          brand: "Aynas",
          material: "Fleece",
          size: "L",
          color: "Navy",
          mainImageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
        },
        {
          id: 18,
          name: "Oversized Hoodie",
          description: "Trendy oversized hoodie with relaxed fit. Perfect for a comfortable, casual look.",
          price: 79.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Cotton Blend",
          size: "XL",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
        },
        {
          id: 19,
          name: "A-Line Skirt",
          description: "Classic A-line skirt with a flattering silhouette. Perfect for both casual and formal occasions.",
          price: 49.99,
          salePrice: undefined,
          stockQuantity: 30,
          brand: "Aynas",
          material: "Cotton Blend",
          size: "M",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
        },
        {
          id: 20,
          name: "Pleated Mini Skirt",
          description: "Trendy pleated mini skirt with a modern design. Great for a youthful, fashionable look.",
          price: 39.99,
          salePrice: undefined,
          stockQuantity: 40,
          brand: "Aynas",
          material: "Polyester",
          size: "S",
          color: "Plaid",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
        },
        {
          id: 21,
          name: "Maxi Skirt",
          description: "Elegant maxi skirt perfect for special occasions. Features a flowing design and comfortable fit.",
          price: 69.99,
          salePrice: undefined,
          stockQuantity: 20,
          brand: "Aynas",
          material: "Chiffon",
          size: "L",
          color: "Floral",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
        },
        {
          id: 22,
          name: "Leather Handbag",
          description: "Elegant leather handbag with multiple compartments. Perfect for everyday use.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Genuine Leather",
          size: "One Size",
          color: "Brown",
          mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
        },
        {
          id: 23,
          name: "Silk Scarf",
          description: "Luxurious silk scarf with beautiful patterns. Adds elegance to any outfit.",
          price: 39.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "100% Silk",
          size: "One Size",
          color: "Multicolor",
          mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
        },
        {
          id: 24,
          name: "Gold Chain Necklace",
          description: "Elegant gold chain necklace perfect for special occasions. Made with high-quality materials.",
          price: 79.99,
          salePrice: undefined,
          stockQuantity: 35,
          brand: "Aynas",
          material: "Gold Plated",
          size: "One Size",
          color: "Gold",
          mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: false,
          createdAt: new Date().toISOString(),
          category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
        }
      ];

      const product = fallbackProducts.find(p => p.id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<Category[]>('/categories');
      return response.data;
    } catch (error) {
      console.warn('Categories API not available, using fallback data');
      // Fallback categories for local development
      return [
        { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" },
        { id: 2, name: "Jeans", description: "Classic and modern jeans" },
        { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" },
        { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" },
        { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" },
        { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" },
        { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" },
        { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
      ];
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const response = await api.get<Product[]>('/featured');
      return response.data;
    } catch (error) {
      console.warn('Featured products API not available, using fallback data');
      // Fallback featured products for local development - All featured products
      return [
        {
          id: 1,
          name: "Classic Cotton T-Shirt",
          description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear with a modern, relaxed silhouette.",
          price: 29.99,
          salePrice: undefined,
          stockQuantity: 100,
          brand: "Aynas",
          material: "100% Cotton",
          size: "M",
          color: "White",
          mainImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
        },
        {
          id: 4,
          name: "Slim Fit Jeans",
          description: "Modern slim fit jeans with stretch comfort. Available in multiple washes with a contemporary fit.",
          price: 79.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "98% Cotton, 2% Elastane",
          size: "32",
          color: "Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
        },
        {
          id: 7,
          name: "Elegant Evening Dress",
          description: "Stunning evening dress perfect for special occasions. Features a flattering silhouette and premium fabric.",
          price: 149.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Silk Blend",
          size: "M",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
        },
        {
          id: 10,
          name: "Classic Denim Jacket",
          description: "Timeless denim jacket with a modern fit. Perfect for layering and adding style to any outfit.",
          price: 99.99,
          salePrice: undefined,
          stockQuantity: 30,
          brand: "Aynas",
          material: "100% Cotton Denim",
          size: "M",
          color: "Blue",
          mainImageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
        },
        {
          id: 13,
          name: "Classic Sneakers",
          description: "Comfortable and stylish sneakers perfect for everyday wear. Made with premium materials for durability.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 50,
          brand: "Aynas",
          material: "Canvas & Rubber",
          size: "9",
          color: "White",
          mainImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
        },
        {
          id: 16,
          name: "Classic Pullover Hoodie",
          description: "Comfortable pullover hoodie made from soft cotton blend. Perfect for casual wear.",
          price: 59.99,
          salePrice: undefined,
          stockQuantity: 45,
          brand: "Aynas",
          material: "80% Cotton, 20% Polyester",
          size: "M",
          color: "Gray",
          mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
        },
        {
          id: 19,
          name: "A-Line Skirt",
          description: "Classic A-line skirt with a flattering silhouette. Perfect for both casual and formal occasions.",
          price: 49.99,
          salePrice: undefined,
          stockQuantity: 30,
          brand: "Aynas",
          material: "Cotton Blend",
          size: "M",
          color: "Black",
          mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
        },
        {
          id: 22,
          name: "Leather Handbag",
          description: "Elegant leather handbag with multiple compartments. Perfect for everyday use.",
          price: 89.99,
          salePrice: undefined,
          stockQuantity: 25,
          brand: "Aynas",
          material: "Genuine Leather",
          size: "One Size",
          color: "Brown",
          mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
          imageUrls: [],
          isActive: true,
          isFeatured: true,
          createdAt: new Date().toISOString(),
          category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
        }
      ];
    }
  }

  async searchProducts(query: string, page: number = 1, pageSize: number = 12): Promise<ProductListResponse> {
    const response = await api.get<ProductListResponse>('/products/search', {
      params: { q: query, page, pageSize }
    });
    return response.data;
  }
}

export const productService = new ProductService();
