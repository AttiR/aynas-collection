using AynasCollection.Application.DTOs;

namespace AynasCollection.Application.Services
{
    public interface IProductService
    {
        Task<ProductListResponse> GetProductsAsync(ProductFilterDto filter);
        Task<ProductDto?> GetProductByIdAsync(int id);
        Task<List<CategoryDto>> GetCategoriesAsync();
        Task<List<ProductDto>> GetFeaturedProductsAsync();
        Task<ProductListResponse> SearchProductsAsync(string searchTerm, int page = 1, int pageSize = 12);
    }
}
