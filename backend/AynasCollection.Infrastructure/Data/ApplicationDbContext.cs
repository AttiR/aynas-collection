using AynasCollection.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace AynasCollection.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.PasswordHash).IsRequired();
                entity.Property(e => e.FirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.LastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.PhoneNumber).HasMaxLength(20);
                entity.Property(e => e.Address).HasMaxLength(500);
                entity.Property(e => e.City).HasMaxLength(100);
                entity.Property(e => e.State).HasMaxLength(100);
                entity.Property(e => e.ZipCode).HasMaxLength(20);
                entity.Property(e => e.Country).HasMaxLength(100);
                entity.Property(e => e.Role).IsRequired().HasMaxLength(50);

                // Email verification fields
                entity.Property(e => e.IsEmailVerified).HasDefaultValue(false);
                entity.Property(e => e.EmailVerificationToken).HasMaxLength(255);
                entity.Property(e => e.PasswordResetToken).HasMaxLength(255);
                entity.Property(e => e.RefreshToken).HasMaxLength(500);
                entity.Property(e => e.LoginAttempts).HasDefaultValue(0);
            });

            // Category configuration
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
            });

            // Product configuration
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(1000);
                entity.Property(e => e.Price).HasColumnType("REAL");
                entity.Property(e => e.SalePrice).HasColumnType("REAL");
                entity.Property(e => e.StockQuantity).HasDefaultValue(0);
                entity.Property(e => e.Brand).HasMaxLength(100);
                entity.Property(e => e.Material).HasMaxLength(200);
                entity.Property(e => e.Size).HasMaxLength(50);
                entity.Property(e => e.Color).HasMaxLength(50);
                entity.Property(e => e.MainImageUrl).HasMaxLength(500);
                entity.Property(e => e.IsActive).HasDefaultValue(true);
                entity.Property(e => e.IsFeatured).HasDefaultValue(false);

                entity.HasOne(e => e.Category)
                    .WithMany(e => e.Products)
                    .HasForeignKey(e => e.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Order configuration
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.OrderNumber).IsRequired().HasMaxLength(50);
                entity.HasIndex(e => e.OrderNumber).IsUnique();
                entity.Property(e => e.TotalAmount).HasColumnType("REAL");
                entity.Property(e => e.TaxAmount).HasColumnType("REAL");
                entity.Property(e => e.ShippingAmount).HasColumnType("REAL");
                entity.Property(e => e.Status).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PaymentStatus).IsRequired().HasMaxLength(50);
                entity.Property(e => e.StripePaymentIntentId).HasMaxLength(255);
                entity.Property(e => e.ShippingFirstName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ShippingLastName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ShippingAddress).IsRequired().HasMaxLength(500);
                entity.Property(e => e.ShippingCity).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ShippingState).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ShippingZipCode).IsRequired().HasMaxLength(20);
                entity.Property(e => e.ShippingCountry).IsRequired().HasMaxLength(100);
                entity.Property(e => e.ShippingPhone).IsRequired().HasMaxLength(20);
                entity.Property(e => e.TrackingNumber).HasMaxLength(100);
                entity.Property(e => e.Notes).HasMaxLength(1000);

                entity.HasOne(e => e.User)
                    .WithMany(e => e.Orders)
                    .HasForeignKey(e => e.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // OrderItem configuration
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.UnitPrice).HasColumnType("REAL");
                entity.Property(e => e.TotalPrice).HasColumnType("REAL");
                entity.Property(e => e.Size).HasMaxLength(20);
                entity.Property(e => e.Color).HasMaxLength(20);

                entity.HasOne(e => e.Order)
                    .WithMany(e => e.OrderItems)
                    .HasForeignKey(e => e.OrderId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Product)
                    .WithMany(e => e.OrderItems)
                    .HasForeignKey(e => e.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Seed data
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "T-Shirts", Description = "Comfortable and stylish t-shirts", IsActive = true },
                new Category { Id = 2, Name = "Jeans", Description = "Classic and modern jeans", IsActive = true },
                new Category { Id = 3, Name = "Dresses", Description = "Elegant dresses for every occasion", IsActive = true },
                new Category { Id = 4, Name = "Jackets", Description = "Trendy jackets and outerwear", IsActive = true },
                new Category { Id = 5, Name = "Shoes", Description = "Comfortable and fashionable footwear", IsActive = true },
                new Category { Id = 6, Name = "Hoodies", Description = "Warm and cozy hoodies", IsActive = true },
                new Category { Id = 7, Name = "Skirts", Description = "Stylish skirts for all occasions", IsActive = true },
                new Category { Id = 8, Name = "Accessories", Description = "Fashion accessories and jewelry", IsActive = true }
            );

            // Seed Products
            modelBuilder.Entity<Product>().HasData(
                // T-Shirts Category
                new Product
                {
                    Id = 1,
                    Name = "Classic Cotton T-Shirt",
                    Description = "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear with a modern, relaxed silhouette.",
                    Price = 29.99m,
                    StockQuantity = 100,
                    Brand = "Aynas",
                    Material = "100% Cotton",
                    Size = "M",
                    Color = "White",
                    MainImageUrl = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
                    CategoryId = 1,
                    IsActive = true,
                    IsFeatured = true
                },
                new Product
                {
                    Id = 2,
                    Name = "Premium V-Neck T-Shirt",
                    Description = "Elegant v-neck t-shirt made from premium cotton. Perfect for both casual and semi-formal occasions.",
                    Price = 34.99m,
                    StockQuantity = 75,
                    Brand = "Aynas",
                    Material = "100% Organic Cotton",
                    Size = "L",
                    Color = "Navy Blue",
                    MainImageUrl = "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop",
                    CategoryId = 1,
                    IsActive = true,
                    IsFeatured = false
                },
                new Product
                {
                    Id = 3,
                    Name = "Graphic Print T-Shirt",
                    Description = "Stylish graphic t-shirt with unique artwork. Made from soft, breathable cotton for maximum comfort.",
                    Price = 39.99m,
                    StockQuantity = 50,
                    Brand = "Aynas",
                    Material = "100% Cotton",
                    Size = "S",
                    Color = "Black",
                    MainImageUrl = "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop",
                    CategoryId = 1,
                    IsActive = true,
                    IsFeatured = false
                },

                // Jeans Category
                new Product
                {
                    Id = 4,
                    Name = "Slim Fit Jeans",
                    Description = "Modern slim fit jeans with stretch comfort. Available in multiple washes with a contemporary fit.",
                    Price = 79.99m,
                    StockQuantity = 50,
                    Brand = "Aynas",
                    Material = "98% Cotton, 2% Elastane",
                    Size = "32",
                    Color = "Blue",
                    MainImageUrl = "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
                    CategoryId = 2,
                    IsActive = true,
                    IsFeatured = true
                },
                new Product
                {
                    Id = 5,
                    Name = "Classic Straight Leg Jeans",
                    Description = "Timeless straight leg jeans with a comfortable fit. Perfect for any casual occasion.",
                    Price = 69.99m,
                    StockQuantity = 60,
                    Brand = "Aynas",
                    Material = "100% Cotton",
                    Size = "34",
                    Color = "Dark Blue",
                    MainImageUrl = "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop",
                    CategoryId = 2,
                    IsActive = true,
                    IsFeatured = false
                },
                new Product
                {
                    Id = 6,
                    Name = "High-Waist Skinny Jeans",
                    Description = "Fashionable high-waist skinny jeans with a flattering fit. Made from premium denim with stretch.",
                    Price = 89.99m,
                    StockQuantity = 40,
                    Brand = "Aynas",
                    Material = "95% Cotton, 5% Elastane",
                    Size = "30",
                    Color = "Light Blue",
                    MainImageUrl = "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop",
                    CategoryId = 2,
                    IsActive = true,
                    IsFeatured = false
                },

                // Dresses Category
                new Product
                {
                    Id = 7,
                    Name = "Elegant Evening Dress",
                    Description = "Stunning evening dress perfect for special occasions. Features a flattering silhouette and premium fabric.",
                    Price = 149.99m,
                    StockQuantity = 25,
                    Brand = "Aynas",
                    Material = "Silk Blend",
                    Size = "M",
                    Color = "Black",
                    MainImageUrl = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
                    CategoryId = 3,
                    IsActive = true,
                    IsFeatured = true
                },
                new Product
                {
                    Id = 8,
                    Name = "Summer Floral Dress",
                    Description = "Beautiful floral print dress perfect for summer days. Lightweight and comfortable with a feminine design.",
                    Price = 89.99m,
                    StockQuantity = 35,
                    Brand = "Aynas",
                    Material = "Cotton Blend",
                    Size = "S",
                    Color = "Floral Print",
                    MainImageUrl = "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop",
                    CategoryId = 3,
                    IsActive = true,
                    IsFeatured = false
                },
                new Product
                {
                    Id = 9,
                    Name = "Casual Maxi Dress",
                    Description = "Comfortable maxi dress for everyday wear. Features a relaxed fit and breathable fabric.",
                    Price = 69.99m,
                    StockQuantity = 45,
                    Brand = "Aynas",
                    Material = "Rayon Blend",
                    Size = "L",
                    Color = "Navy",
                    MainImageUrl = "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
                    CategoryId = 3,
                    IsActive = true,
                    IsFeatured = false
                },

                // Jackets Category
                new Product
                {
                    Id = 10,
                    Name = "Classic Denim Jacket",
                    Description = "Timeless denim jacket with a modern fit. Perfect for layering and adding style to any outfit.",
                    Price = 99.99m,
                    StockQuantity = 30,
                    Brand = "Aynas",
                    Material = "100% Cotton Denim",
                    Size = "M",
                    Color = "Blue",
                    MainImageUrl = "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=600&fit=crop",
                    CategoryId = 4,
                    IsActive = true,
                    IsFeatured = true
                },
                new Product
                {
                    Id = 11,
                    Name = "Leather Biker Jacket",
                    Description = "Premium leather biker jacket with classic styling. Features quality hardware and comfortable fit.",
                    Price = 299.99m,
                    StockQuantity = 20,
                    Brand = "Aynas",
                    Material = "Genuine Leather",
                    Size = "L",
                    Color = "Black",
                    MainImageUrl = "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
                    CategoryId = 4,
                    IsActive = true,
                    IsFeatured = false
                },
                new Product
                {
                    Id = 12,
                    Name = "Casual Blazer",
                    Description = "Versatile casual blazer perfect for work or social occasions. Features a modern cut and comfortable fit.",
                    Price = 129.99m,
                    StockQuantity = 25,
                    Brand = "Aynas",
                    Material = "Wool Blend",
                    Size = "S",
                    Color = "Gray",
                    MainImageUrl = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
                    CategoryId = 4,
                    IsActive = true,
                    IsFeatured = false
                },

                // Shoes Category
                new Product
                {
                    Id = 13,
                    Name = "Classic White Sneakers",
                    Description = "Timeless white sneakers with premium comfort. Perfect for everyday wear with any outfit.",
                    Price = 89.99m,
                    StockQuantity = 60,
                    Brand = "Aynas",
                    Material = "Leather & Canvas",
                    Size = "42",
                    Color = "White",
                    MainImageUrl = "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
                    CategoryId = 5,
                    IsActive = true,
                    IsFeatured = true
                },
                new Product
                {
                    Id = 14,
                    Name = "Elegant Heels",
                    Description = "Sophisticated heels perfect for formal occasions. Features a comfortable design and premium materials.",
                    Price = 159.99m,
                    StockQuantity = 30,
                    Brand = "Aynas",
                    Material = "Leather",
                    Size = "38",
                    Color = "Black",
                    MainImageUrl = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop",
                    CategoryId = 5,
                    IsActive = true,
                    IsFeatured = false
                },
                new Product
                {
                    Id = 15,
                    Name = "Casual Loafers",
                    Description = "Comfortable loafers for casual and semi-formal occasions. Made from premium leather with cushioned sole.",
                    Price = 119.99m,
                    StockQuantity = 40,
                    Brand = "Aynas",
                    Material = "Genuine Leather",
                    Size = "40",
                    Color = "Brown",
                    MainImageUrl = "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=600&fit=crop",
                    CategoryId = 5,
                    IsActive = true,
                    IsFeatured = false
                },

                // Hoodies Category
                new Product
                {
                    Id = 16,
                    Name = "Premium Cotton Hoodie",
                    Description = "Ultra-soft cotton hoodie with a comfortable fit. Perfect for casual wear and lounging.",
                    Price = 59.99m,
                    StockQuantity = 80,
                    Brand = "Aynas",
                    Material = "100% Cotton",
                    Size = "L",
                    Color = "Gray",
                    MainImageUrl = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
                    CategoryId = 6,
                    IsActive = true,
                    IsFeatured = true
                },
                new Product
                {
                    Id = 17,
                    Name = "Zip-Up Athletic Hoodie",
                    Description = "Performance hoodie perfect for workouts and active lifestyle. Features moisture-wicking technology.",
                    Price = 79.99m,
                    StockQuantity = 50,
                    Brand = "Aynas",
                    Material = "Polyester Blend",
                    Size = "M",
                    Color = "Navy",
                    MainImageUrl = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=600&fit=crop",
                    CategoryId = 6,
                    IsActive = true,
                    IsFeatured = false
                },
                new Product
                {
                    Id = 18,
                    Name = "Oversized Comfort Hoodie",
                    Description = "Trendy oversized hoodie with a relaxed fit. Perfect for a cozy, casual look.",
                    Price = 69.99m,
                    StockQuantity = 45,
                    Brand = "Aynas",
                    Material = "Cotton Blend",
                    Size = "XL",
                    Color = "Black",
                    MainImageUrl = "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop",
                    CategoryId = 6,
                    IsActive = true,
                    IsFeatured = false
                },

                // Skirts Category
                new Product
                {
                    Id = 19,
                    Name = "A-Line Midi Skirt",
                    Description = "Elegant A-line midi skirt perfect for office and casual wear. Features a flattering silhouette.",
                    Price = 79.99m,
                    StockQuantity = 35,
                    Brand = "Aynas",
                    Material = "Wool Blend",
                    Size = "M",
                    Color = "Beige",
                    MainImageUrl = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
                    CategoryId = 7,
                    IsActive = true,
                    IsFeatured = true
                },
                new Product
                {
                    Id = 20,
                    Name = "Pleated Mini Skirt",
                    Description = "Stylish pleated mini skirt with a modern design. Perfect for a youthful, trendy look.",
                    Price = 59.99m,
                    StockQuantity = 40,
                    Brand = "Aynas",
                    Material = "Polyester",
                    Size = "S",
                    Color = "Plaid",
                    MainImageUrl = "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
                    CategoryId = 7,
                    IsActive = true,
                    IsFeatured = false
                },
                new Product
                {
                    Id = 21,
                    Name = "Maxi Skirt with Slit",
                    Description = "Elegant maxi skirt with a side slit for added movement. Perfect for evening events.",
                    Price = 99.99m,
                    StockQuantity = 25,
                    Brand = "Aynas",
                    Material = "Silk Blend",
                    Size = "L",
                    Color = "Emerald Green",
                    MainImageUrl = "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop",
                    CategoryId = 7,
                    IsActive = true,
                    IsFeatured = false
                },

                // Accessories Category
                new Product
                {
                    Id = 22,
                    Name = "Leather Crossbody Bag",
                    Description = "Stylish leather crossbody bag with adjustable strap. Perfect for everyday essentials.",
                    Price = 89.99m,
                    StockQuantity = 30,
                    Brand = "Aynas",
                    Material = "Genuine Leather",
                    Size = "One Size",
                    Color = "Brown",
                    MainImageUrl = "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop",
                    CategoryId = 8,
                    IsActive = true,
                    IsFeatured = true
                },
                new Product
                {
                    Id = 23,
                    Name = "Minimalist Watch",
                    Description = "Elegant minimalist watch with a clean design. Features a comfortable leather strap.",
                    Price = 199.99m,
                    StockQuantity = 20,
                    Brand = "Aynas",
                    Material = "Stainless Steel & Leather",
                    Size = "One Size",
                    Color = "Silver",
                    MainImageUrl = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=600&fit=crop",
                    CategoryId = 8,
                    IsActive = true,
                    IsFeatured = false
                },
                new Product
                {
                    Id = 24,
                    Name = "Silk Scarf",
                    Description = "Luxurious silk scarf with elegant patterns. Perfect for adding sophistication to any outfit.",
                    Price = 49.99m,
                    StockQuantity = 50,
                    Brand = "Aynas",
                    Material = "100% Silk",
                    Size = "90x90cm",
                    Color = "Multi-color",
                    MainImageUrl = "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
                    CategoryId = 8,
                    IsActive = true,
                    IsFeatured = false
                }
            );
        }
    }
}
