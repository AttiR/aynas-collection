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
    const response = await api.get<ProductListResponse>('/products', { params: filter });
    return response.data;
  }

  async getProduct(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  }

  async getCategories(): Promise<Category[]> {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products/featured');
    return response.data;
  }

  async searchProducts(query: string, page: number = 1, pageSize: number = 12): Promise<ProductListResponse> {
    const response = await api.get<ProductListResponse>('/products/search', {
      params: { q: query, page, pageSize }
    });
    return response.data;
  }
}

export const productService = new ProductService();
