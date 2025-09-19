const https = require('https');

module.exports = async function (context, req) {
    context.log('Product GetById function processed a request.');
    
    const productId = context.bindingData.id;
    context.log('Product ID:', productId);

    try {
        // Try to get data from the .NET API first
        const dotnetApiUrl = `https://aynas-collection-api.azurewebsites.net/api/products/${productId}`;
        
        context.log('Attempting to fetch product from .NET API:', dotnetApiUrl);
        
        const response = await new Promise((resolve, reject) => {
            const options = {
                headers: {
                    'User-Agent': 'Azure-Function/1.0',
                    'Accept': 'application/json'
                }
            };
            
            const request = https.get(dotnetApiUrl, options, (res) => {
                context.log('Product response status:', res.statusCode);
                
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const jsonData = JSON.parse(data);
                        context.log('Successfully fetched product from .NET API');
                        resolve(jsonData);
                    } catch (error) {
                        context.log('Error parsing product JSON:', error.message);
                        reject(error);
                    }
                });
            });
            
            request.on('error', (error) => {
                context.log('Product request error:', error.message);
                reject(error);
            });
            
            request.setTimeout(10000, () => {
                context.log('Product request timeout after 10 seconds');
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
        const fallbackProduct = {
            id: parseInt(productId),
            name: "Sample Product",
            description: "This is a sample product description.",
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
        };

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            body: fallbackProduct
        };
    }
};
