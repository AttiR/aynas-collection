using Microsoft.AspNetCore.Mvc;
using AynasCollection.Application.Services;
using AynasCollection.Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace AynasCollection.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("checkout")]
        public async Task<ActionResult<OrderDto>> Checkout(CheckoutRequest request)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized();
                }

                var order = await _orderService.CreateOrderAsync(request, userId);
                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetUserOrders()
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized();
                }

                var orders = await _orderService.GetUserOrdersAsync(userId);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            try
            {
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                {
                    return Unauthorized();
                }

                var order = await _orderService.GetOrderByIdAsync(id, userId);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("payment-intent")]
        public async Task<ActionResult<PaymentIntentResponse>> CreatePaymentIntent(PaymentIntentRequest request)
        {
            try
            {
                var response = await _orderService.CreatePaymentIntentAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("payment-confirmation")]
        public async Task<ActionResult> ConfirmPayment([FromBody] PaymentConfirmationRequest request)
        {
            try
            {
                var success = await _orderService.UpdateOrderPaymentStatusAsync(
                    request.OrderNumber,
                    request.PaymentIntentId,
                    request.Status);

                if (success)
                {
                    return Ok(new { message = "Payment confirmed successfully" });
                }
                return BadRequest(new { message = "Failed to confirm payment" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

    public class PaymentConfirmationRequest
    {
        public string OrderNumber { get; set; } = string.Empty;
        public string PaymentIntentId { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
