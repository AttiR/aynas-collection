using AynasCollection.Application.DTOs;

namespace AynasCollection.Application.Services
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(CheckoutRequest request, int userId);
        Task<OrderDto?> GetOrderByIdAsync(int orderId, int userId);
        Task<List<OrderDto>> GetUserOrdersAsync(int userId);
        Task<PaymentIntentResponse> CreatePaymentIntentAsync(PaymentIntentRequest request);
        Task<bool> UpdateOrderPaymentStatusAsync(string orderNumber, string paymentIntentId, string status);
        Task<decimal> CalculateOrderTotalAsync(List<CartItemDto> items);
    }
}
