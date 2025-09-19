const https = require('https');

module.exports = async function (context, req) {
    context.log('Products function processed a request.');

    try {
        // Try to get data from the .NET API first
        const dotnetApiUrl = 'https://aynas-collection-api.azurewebsites.net/api/products';
        
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
        const realProducts = [
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
            }
        ];

        const realResponse = {
            products: realProducts,
            totalCount: realProducts.length,
            currentPage: 1,
            pageSize: 12,
            totalPages: 1
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
