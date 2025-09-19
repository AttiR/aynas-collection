const https = require('https');

module.exports = async function (context, req) {
    context.log('Products function processed a request.');

    try {
        // Try to get data from the .NET API first
        const dotnetApiUrl = 'https://aynas-collection-api.azurewebsites.net/api/products';
        
        const response = await new Promise((resolve, reject) => {
            const request = https.get(dotnetApiUrl, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        resolve(jsonData);
                    } catch (error) {
                        reject(error);
                    }
                });
            });
            
            request.on('error', (error) => {
                reject(error);
            });
            
            request.setTimeout(5000, () => {
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
        const fallbackProducts = [
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
            },
            {
                id: 2,
                name: "Premium V-Neck T-Shirt",
                description: "Elegant v-neck t-shirt made from premium cotton.",
                price: 34.99,
                stockQuantity: 75,
                brand: "Aynas",
                material: "100% Organic Cotton",
                size: "L",
                color: "Navy Blue",
                mainImageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=600&fit=crop",
                isActive: true,
                isFeatured: false,
                category: { id: 1, name: "T-Shirts" }
            }
        ];

        const fallbackResponse = {
            products: fallbackProducts,
            totalCount: fallbackProducts.length,
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
            body: fallbackResponse
        };
    }
};
