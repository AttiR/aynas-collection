using Microsoft.AspNetCore.Mvc;
using AynasCollection.Application.Services;
using AynasCollection.Application.DTOs;

namespace AynasCollection.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly IProductService _productService;

        public CategoriesController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            try
            {
                var categories = await _productService.GetCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching categories.", error = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            try
            {
                var categories = await _productService.GetCategoriesAsync();
                var category = categories.FirstOrDefault(c => c.Id == id);
                if (category == null)
                {
                    return NotFound(new { message = "Category not found." });
                }
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching the category.", error = ex.Message });
            }
        }

        [HttpGet("{id}/products")]
        public async Task<ActionResult<ProductListResponse>> GetCategoryProducts(int id, [FromQuery] int page = 1, [FromQuery] int pageSize = 12)
        {
            try
            {
                var filter = new ProductFilterDto
                {
                    CategoryId = id,
                    Page = page,
                    PageSize = pageSize
                };
                var products = await _productService.GetProductsAsync(filter);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching category products.", error = ex.Message });
            }
        }
    }
}
