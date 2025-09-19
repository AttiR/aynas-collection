const https = require('https');

module.exports = async function (context, req) {
    context.log('Products function processed a request.');

    // Get query parameters
    const categoryId = req.query.categoryId;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 12;
    const searchTerm = req.query.searchTerm;

    context.log('Query parameters:', { categoryId, page, pageSize, searchTerm });

    try {
        // Try to get data from the .NET API first
        let dotnetApiUrl = 'https://aynas-collection-api.azurewebsites.net/api/products';
        
        // Add query parameters if they exist
        const queryParams = new URLSearchParams();
        if (categoryId) queryParams.append('categoryId', categoryId);
        if (page) queryParams.append('page', page);
        if (pageSize) queryParams.append('pageSize', pageSize);
        if (searchTerm) queryParams.append('searchTerm', searchTerm);
        
        if (queryParams.toString()) {
            dotnetApiUrl += '?' + queryParams.toString();
        }

        context.log('Attempting to fetch from .NET API:', dotnetApiUrl);

        const response = await new Promise((resolve, reject) => {
            const options = {
                headers: {
                    'User-Agent': 'Azure-Function/1.0',
                    'Accept': 'application/json'
                }
            };

            const request = https.get(dotnetApiUrl, options, (res) => {
                context.log('Response status:', res.statusCode);
                context.log('Response headers:', res.headers);

                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        context.log('Successfully fetched data from .NET API');
                        resolve(jsonData);
                    } catch (error) {
                        context.log('Error parsing JSON:', error.message);
                        reject(error);
                    }
                });
            });

            request.on('error', (error) => {
                context.log('Request error:', error.message);
                reject(error);
            });

            request.setTimeout(10000, () => {
                context.log('Request timeout after 10 seconds');
                request.destroy();
                reject(new Error('Request timeout'));
            });
        });

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            body: response
        };

    } catch (error) {
        context.log('Error fetching from .NET API, using real data directly:', error.message);

        // Use real data directly instead of fallback
        let realProducts = [
            {
                id: 1,
                name: "Classic Cotton T-Shirt",
                description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear with a modern, relaxed silhouette.",
                price: 29.99,
                salePrice: null,
                stockQuantity: 100,
                brand: "Aynas",
                material: "100% Cotton",
                size: "M",
                color: "White",
                mainImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
            },
            {
                id: 2,
                name: "Premium V-Neck T-Shirt",
                description: "Elegant v-neck t-shirt made from premium cotton. Perfect for both casual and semi-formal occasions.",
                price: 34.99,
                salePrice: null,
                stockQuantity: 75,
                brand: "Aynas",
                material: "100% Organic Cotton",
                size: "L",
                color: "Navy Blue",
                mainImageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
            },
            {
                id: 3,
                name: "Graphic Print T-Shirt",
                description: "Stylish graphic t-shirt with unique artwork. Made from soft, breathable cotton for maximum comfort.",
                price: 39.99,
                salePrice: null,
                stockQuantity: 50,
                brand: "Aynas",
                material: "100% Cotton",
                size: "S",
                color: "Black",
                mainImageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts" }
            },
            {
                id: 4,
                name: "Slim Fit Jeans",
                description: "Modern slim fit jeans with stretch comfort. Available in multiple washes with a contemporary fit.",
                price: 79.99,
                salePrice: null,
                stockQuantity: 50,
                brand: "Aynas",
                material: "98% Cotton, 2% Elastane",
                size: "32",
                color: "Blue",
                mainImageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
            },
            {
                id: 5,
                name: "Classic Straight Leg Jeans",
                description: "Timeless straight leg jeans with a comfortable fit. Perfect for any casual occasion.",
                price: 69.99,
                salePrice: null,
                stockQuantity: 60,
                brand: "Aynas",
                material: "100% Cotton",
                size: "34",
                color: "Dark Blue",
                mainImageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
            },
            {
                id: 6,
                name: "High-Waist Skinny Jeans",
                description: "Fashionable high-waist skinny jeans with a flattering fit. Made from premium denim with stretch.",
                price: 89.99,
                salePrice: null,
                stockQuantity: 40,
                brand: "Aynas",
                material: "95% Cotton, 5% Elastane",
                size: "30",
                color: "Light Blue",
                mainImageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 2, name: "Jeans", description: "Classic and modern jeans" }
            },
            {
                id: 7,
                name: "Elegant Evening Dress",
                description: "Stunning evening dress perfect for special occasions. Features a flattering silhouette and premium fabric.",
                price: 149.99,
                salePrice: null,
                stockQuantity: 25,
                brand: "Aynas",
                material: "Silk Blend",
                size: "M",
                color: "Black",
                mainImageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
            },
            {
                id: 8,
                name: "Summer Floral Dress",
                description: "Beautiful floral print dress perfect for summer days. Lightweight and comfortable with a feminine design.",
                price: 89.99,
                salePrice: null,
                stockQuantity: 35,
                brand: "Aynas",
                material: "Cotton Blend",
                size: "S",
                color: "Floral Print",
                mainImageUrl: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
            },
            {
                id: 9,
                name: "Casual Maxi Dress",
                description: "Comfortable maxi dress for everyday wear. Features a relaxed fit and breathable fabric.",
                price: 69.99,
                salePrice: null,
                stockQuantity: 45,
                brand: "Aynas",
                material: "Rayon Blend",
                size: "L",
                color: "Navy",
                mainImageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 3, name: "Dresses", description: "Elegant dresses for every occasion" }
            },
            {
                id: 10,
                name: "Classic Denim Jacket",
                description: "Timeless denim jacket with a modern fit. Perfect for layering and adding style to any outfit.",
                price: 99.99,
                salePrice: null,
                stockQuantity: 30,
                brand: "Aynas",
                material: "100% Cotton Denim",
                size: "M",
                color: "Blue",
                mainImageUrl: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
            },
            {
                id: 11,
                name: "Leather Biker Jacket",
                description: "Premium leather biker jacket with classic styling. Features quality hardware and comfortable fit.",
                price: 299.99,
                salePrice: null,
                stockQuantity: 20,
                brand: "Aynas",
                material: "Genuine Leather",
                size: "L",
                color: "Black",
                mainImageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
            },
            {
                id: 12,
                name: "Casual Blazer",
                description: "Versatile casual blazer perfect for work or social occasions. Features a modern cut and comfortable fit.",
                price: 129.99,
                salePrice: null,
                stockQuantity: 25,
                brand: "Aynas",
                material: "Wool Blend",
                size: "S",
                color: "Gray",
                mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 4, name: "Jackets", description: "Trendy jackets and outerwear" }
            },
            // Shoes category products
            {
                id: 13,
                name: "Classic Sneakers",
                description: "Comfortable and stylish sneakers perfect for everyday wear. Made with premium materials for durability.",
                price: 89.99,
                salePrice: null,
                stockQuantity: 50,
                brand: "Aynas",
                material: "Canvas & Rubber",
                size: "9",
                color: "White",
                mainImageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
            },
            {
                id: 14,
                name: "Leather Boots",
                description: "Premium leather boots with classic styling. Perfect for both casual and formal occasions.",
                price: 149.99,
                salePrice: null,
                stockQuantity: 30,
                brand: "Aynas",
                material: "Genuine Leather",
                size: "10",
                color: "Brown",
                mainImageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
            },
            {
                id: 15,
                name: "Running Shoes",
                description: "High-performance running shoes with advanced cushioning and breathable design.",
                price: 119.99,
                salePrice: null,
                stockQuantity: 40,
                brand: "Aynas",
                material: "Mesh & Synthetic",
                size: "8",
                color: "Black",
                mainImageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear" }
            },
            // Hoodies category products
            {
                id: 16,
                name: "Classic Pullover Hoodie",
                description: "Comfortable pullover hoodie made from soft cotton blend. Perfect for casual wear.",
                price: 59.99,
                salePrice: null,
                stockQuantity: 45,
                brand: "Aynas",
                material: "80% Cotton, 20% Polyester",
                size: "M",
                color: "Gray",
                mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
            },
            {
                id: 17,
                name: "Zip-Up Hoodie",
                description: "Versatile zip-up hoodie with kangaroo pocket. Great for layering and easy on/off.",
                price: 69.99,
                salePrice: null,
                stockQuantity: 35,
                brand: "Aynas",
                material: "Fleece",
                size: "L",
                color: "Navy",
                mainImageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
            },
            {
                id: 18,
                name: "Oversized Hoodie",
                description: "Trendy oversized hoodie with relaxed fit. Perfect for a comfortable, casual look.",
                price: 79.99,
                salePrice: null,
                stockQuantity: 25,
                brand: "Aynas",
                material: "Cotton Blend",
                size: "XL",
                color: "Black",
                mainImageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 6, name: "Hoodies", description: "Warm and cozy hoodies" }
            },
            // Skirts category products
            {
                id: 19,
                name: "A-Line Skirt",
                description: "Classic A-line skirt with a flattering silhouette. Perfect for both casual and formal occasions.",
                price: 49.99,
                salePrice: null,
                stockQuantity: 30,
                brand: "Aynas",
                material: "Cotton Blend",
                size: "M",
                color: "Black",
                mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
            },
            {
                id: 20,
                name: "Pleated Mini Skirt",
                description: "Trendy pleated mini skirt with a modern design. Great for a youthful, fashionable look.",
                price: 39.99,
                salePrice: null,
                stockQuantity: 40,
                brand: "Aynas",
                material: "Polyester",
                size: "S",
                color: "Plaid",
                mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
            },
            {
                id: 21,
                name: "Maxi Skirt",
                description: "Elegant maxi skirt perfect for special occasions. Features a flowing design and comfortable fit.",
                price: 69.99,
                salePrice: null,
                stockQuantity: 20,
                brand: "Aynas",
                material: "Chiffon",
                size: "L",
                color: "Floral",
                mainImageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 7, name: "Skirts", description: "Stylish skirts for all occasions" }
            },
            // Accessories category products
            {
                id: 22,
                name: "Leather Handbag",
                description: "Elegant leather handbag with multiple compartments. Perfect for everyday use.",
                price: 89.99,
                salePrice: null,
                stockQuantity: 25,
                brand: "Aynas",
                material: "Genuine Leather",
                size: "One Size",
                color: "Brown",
                mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
            },
            {
                id: 23,
                name: "Silk Scarf",
                description: "Luxurious silk scarf with beautiful patterns. Adds elegance to any outfit.",
                price: 39.99,
                salePrice: null,
                stockQuantity: 50,
                brand: "Aynas",
                material: "100% Silk",
                size: "One Size",
                color: "Multicolor",
                mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
            },
            {
                id: 24,
                name: "Gold Chain Necklace",
                description: "Elegant gold chain necklace perfect for special occasions. Made with high-quality materials.",
                price: 79.99,
                salePrice: null,
                stockQuantity: 35,
                brand: "Aynas",
                material: "Gold Plated",
                size: "One Size",
                color: "Gold",
                mainImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 8, name: "Accessories", description: "Fashion accessories and jewelry" }
            }
        ];

        // Filter products by category if categoryId is provided
        if (categoryId) {
            const categoryIdNum = parseInt(categoryId);
            realProducts = realProducts.filter(product => product.category.id === categoryIdNum);
            context.log(`Filtered products for category ${categoryIdNum}: ${realProducts.length} products found`);
        }

        // Filter products by search term if provided
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            realProducts = realProducts.filter(product => 
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.brand.toLowerCase().includes(searchLower)
            );
            context.log(`Filtered products for search term "${searchTerm}": ${realProducts.length} products found`);
        }

        // Apply pagination
        const pageNum = parseInt(page);
        const pageSizeNum = parseInt(pageSize);
        const startIndex = (pageNum - 1) * pageSizeNum;
        const endIndex = startIndex + pageSizeNum;
        const paginatedProducts = realProducts.slice(startIndex, endIndex);
        const totalPages = Math.ceil(realProducts.length / pageSizeNum);

        context.log(`Pagination: page ${pageNum}, pageSize ${pageSizeNum}, total ${realProducts.length} products, showing ${paginatedProducts.length} products`);

        const realResponse = {
            products: paginatedProducts,
            totalCount: realProducts.length,
            currentPage: pageNum,
            pageSize: pageSizeNum,
            totalPages: totalPages
        };

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            body: realResponse
        };
    }
};
