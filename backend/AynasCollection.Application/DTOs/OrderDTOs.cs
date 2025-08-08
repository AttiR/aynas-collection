using System.ComponentModel.DataAnnotations;

namespace AynasCollection.Application.DTOs
{
    public class CartItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public string? Size { get; set; }
        public string? Color { get; set; }
    }

    public class CartItemResponseDto
    {
        public int Id { get; set; }
        public ProductDto Product { get; set; } = new();
        public int Quantity { get; set; }
        public string? Size { get; set; }
        public string? Color { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }

    public class CheckoutRequest
    {
        [Required]
        public List<CartItemDto> Items { get; set; } = new();

        [Required]
        public string ShippingFirstName { get; set; } = string.Empty;

        [Required]
        public string ShippingLastName { get; set; } = string.Empty;

        [Required]
        public string ShippingAddress { get; set; } = string.Empty;

        [Required]
        public string ShippingCity { get; set; } = string.Empty;

        [Required]
        public string ShippingState { get; set; } = string.Empty;

        [Required]
        public string ShippingZipCode { get; set; } = string.Empty;

        [Required]
        public string ShippingCountry { get; set; } = string.Empty;

        [Required]
        public string ShippingPhone { get; set; } = string.Empty;

        public string? Notes { get; set; }
    }

    public class OrderDto
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; } = string.Empty;
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal ShippingAmount { get; set; }
        public string Status { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public string? TrackingNumber { get; set; }
        public DateTime? ShippedDate { get; set; }
        public DateTime? DeliveredDate { get; set; }
        public string? Notes { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new();
        public ShippingAddressDto ShippingAddress { get; set; } = new();
    }

    public class OrderItemDto
    {
        public int Id { get; set; }
        public ProductDto Product { get; set; } = new();
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public string? Size { get; set; }
        public string? Color { get; set; }
    }

    public class ShippingAddressDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string ZipCode { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

    public class PaymentIntentRequest
    {
        public string OrderNumber { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "usd";
    }

    public class PaymentIntentResponse
    {
        public string ClientSecret { get; set; } = string.Empty;
        public string PaymentIntentId { get; set; } = string.Empty;
    }
}
