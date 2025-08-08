using System.ComponentModel.DataAnnotations;

namespace AynasCollection.Core.Entities
{
    public class Order
    {
        public int Id { get; set; }

        [Required]
        public string OrderNumber { get; set; } = string.Empty;

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Required]
        [Range(0, double.MaxValue)]
        public decimal TotalAmount { get; set; }

        [Range(0, double.MaxValue)]
        public decimal TaxAmount { get; set; }

        [Range(0, double.MaxValue)]
        public decimal ShippingAmount { get; set; }

        [Required]
        public string Status { get; set; } = "Pending"; // Pending, Processing, Shipped, Delivered, Cancelled

        [Required]
        public string PaymentStatus { get; set; } = "Pending"; // Pending, Paid, Failed, Refunded

        public string? StripePaymentIntentId { get; set; }

        // Shipping information
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

        public string? TrackingNumber { get; set; }

        public DateTime? ShippedDate { get; set; }

        public DateTime? DeliveredDate { get; set; }

        public string? Notes { get; set; }

        // Foreign key
        public int UserId { get; set; }

        // Navigation properties
        public virtual User User { get; set; } = null!;
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
