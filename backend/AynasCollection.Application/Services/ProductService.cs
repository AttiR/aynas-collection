using AynasCollection.Application.DTOs;
using AynasCollection.Core.Entities;
using AynasCollection.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace AynasCollection.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ProductListResponse> GetProductsAsync(ProductFilterDto filter)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .AsQueryable();

            // Apply filters
            if (!string.IsNullOrEmpty(filter.SearchTerm))
            {
                query = query.Where(p => p.Name.Contains(filter.SearchTerm) || (p.Description != null && p.Description.Contains(filter.SearchTerm)));
            }

            if (filter.CategoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == filter.CategoryId.Value);
            }

            if (filter.MinPrice.HasValue)
            {
                query = query.Where(p => p.Price >= filter.MinPrice.Value);
            }

            if (filter.MaxPrice.HasValue)
            {
                query = query.Where(p => p.Price <= filter.MaxPrice.Value);
            }

            if (!string.IsNullOrEmpty(filter.SortBy))
            {
                query = filter.SortBy.ToLower() switch
                {
                    "price_asc" => query.OrderBy(p => p.Price),
                    "price_desc" => query.OrderByDescending(p => p.Price),
                    "name_asc" => query.OrderBy(p => p.Name),
                    "name_desc" => query.OrderByDescending(p => p.Name),
                    _ => query.OrderBy(p => p.CreatedAt)
                };
            }
            else
            {
                query = query.OrderBy(p => p.CreatedAt);
            }

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / filter.PageSize);

            var products = await query
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    SalePrice = p.SalePrice,
                    MainImageUrl = p.MainImageUrl,
                    ImageUrls = new List<string>(),
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    StockQuantity = p.StockQuantity,
                    IsActive = p.IsActive,
                    IsFeatured = p.IsFeatured,
                    CreatedAt = p.CreatedAt,
                    Brand = p.Brand,
                    Material = p.Material,
                    Size = p.Size,
                    Color = p.Color,
                    Category = new CategoryDto
                    {
                        Id = p.Category.Id,
                        Name = p.Category.Name,
                        Description = p.Category.Description,
                        ImageUrl = p.Category.ImageUrl
                    }
                })
                .ToListAsync();

            return new ProductListResponse
            {
                Products = products,
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = filter.Page,
                PageSize = filter.PageSize
            };
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
                return null;

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                SalePrice = product.SalePrice,
                MainImageUrl = product.MainImageUrl,
                ImageUrls = new List<string>(),
                CategoryId = product.CategoryId,
                CategoryName = product.Category.Name,
                StockQuantity = product.StockQuantity,
                IsFeatured = product.IsFeatured,
                CreatedAt = product.CreatedAt,
                Brand = product.Brand,
                Material = product.Material,
                Size = product.Size,
                Color = product.Color,
                Category = new CategoryDto
                {
                    Id = product.Category.Id,
                    Name = product.Category.Name,
                    Description = product.Category.Description,
                    ImageUrl = product.Category.ImageUrl
                }
            };
        }

        public async Task<List<CategoryDto>> GetCategoriesAsync()
        {
            return await _context.Categories
                .Select(c => new CategoryDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    ImageUrl = c.ImageUrl
                })
                .ToListAsync();
        }

        public async Task<List<ProductDto>> GetFeaturedProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Where(p => p.IsFeatured)
                .Take(8)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    SalePrice = p.SalePrice,
                    MainImageUrl = p.MainImageUrl,
                    ImageUrls = new List<string>(),
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    StockQuantity = p.StockQuantity,
                    IsActive = p.IsActive,
                    IsFeatured = p.IsFeatured,
                    CreatedAt = p.CreatedAt,
                    Brand = p.Brand,
                    Material = p.Material,
                    Size = p.Size,
                    Color = p.Color,
                    Category = new CategoryDto
                    {
                        Id = p.Category.Id,
                        Name = p.Category.Name,
                        Description = p.Category.Description,
                        ImageUrl = p.Category.ImageUrl
                    }
                })
                .ToListAsync();
        }

        public async Task<ProductListResponse> SearchProductsAsync(string searchTerm, int page = 1, int pageSize = 12)
        {
            var query = _context.Products
                .Include(p => p.Category)
                .Where(p => p.Name.Contains(searchTerm) || (p.Description != null && p.Description.Contains(searchTerm)))
                .OrderBy(p => p.Name);

            var totalCount = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var products = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ProductDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    SalePrice = p.SalePrice,
                    MainImageUrl = p.MainImageUrl,
                    ImageUrls = new List<string>(),
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.Name,
                    StockQuantity = p.StockQuantity,
                    IsActive = p.IsActive,
                    IsFeatured = p.IsFeatured,
                    CreatedAt = p.CreatedAt,
                    Brand = p.Brand,
                    Material = p.Material,
                    Size = p.Size,
                    Color = p.Color,
                    Category = new CategoryDto
                    {
                        Id = p.Category.Id,
                        Name = p.Category.Name,
                        Description = p.Category.Description,
                        ImageUrl = p.Category.ImageUrl
                    }
                })
                .ToListAsync();

            return new ProductListResponse
            {
                Products = products,
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = page,
                PageSize = pageSize
            };
        }
    }
}
