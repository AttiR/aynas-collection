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
        context.log('Error fetching from .NET API, using fallback data:', error.message);
        
        // Fallback to sample data if .NET API is not available
        const fallbackFeaturedProducts = [
            {
                id: 1,
                name: "Classic Cotton T-Shirt",
                description: "Premium cotton t-shirt with a comfortable fit.",
                price: 29.99,
                stockQuantity: 100,
                brand: "Aynas",
                material: "100% Cotton",
                size: "M",
                color: "White",
                mainImageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: true,
                category: { id: 1, name: "T-Shirts" }
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
            body: fallbackFeaturedProducts
        };
    }
};
