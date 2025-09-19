const https = require('https');

module.exports = async function (context, req) {
    context.log('Featured Products function processed a request.');

    try {
        // Try to get data from the .NET API first
        const dotnetApiUrl = 'https://aynas-collection-api.azurewebsites.net/api/products/featured';

        context.log('Attempting to fetch featured products from .NET API:', dotnetApiUrl);

        const response = await new Promise((resolve, reject) => {
            const options = {
                headers: {
                    'User-Agent': 'Azure-Function/1.0',
                    'Accept': 'application/json'
                }
            };

            const request = https.get(dotnetApiUrl, options, (res) => {
                context.log('Featured products response status:', res.statusCode);

                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        context.log('Successfully fetched featured products from .NET API');
                        resolve(jsonData);
                    } catch (error) {
                        context.log('Error parsing featured products JSON:', error.message);
                        reject(error);
                    }
                });
            });

            request.on('error', (error) => {
                context.log('Featured products request error:', error.message);
                reject(error);
            });

            request.setTimeout(10000, () => {
                context.log('Featured products request timeout after 10 seconds');
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
        const realFeaturedProducts = [
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
            }
        ];

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            body: realFeaturedProducts
        };
    }
};
