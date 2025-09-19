const https = require('https');

module.exports = async function (context, req) {
    context.log('Categories function processed a request.');

    try {
        // Try to get data from the .NET API first
        const dotnetApiUrl = 'https://aynas-collection-api.azurewebsites.net/api/categories';
        
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
        const fallbackCategories = [
            { id: 1, name: "T-Shirts", description: "Comfortable and stylish t-shirts", imageUrl: null },
            { id: 2, name: "Jeans", description: "Classic and modern jeans", imageUrl: null },
            { id: 3, name: "Dresses", description: "Elegant dresses for every occasion", imageUrl: null },
            { id: 4, name: "Jackets", description: "Trendy jackets and outerwear", imageUrl: null },
            { id: 5, name: "Shoes", description: "Comfortable and fashionable footwear", imageUrl: null },
            { id: 6, name: "Hoodies", description: "Warm and cozy hoodies", imageUrl: null },
            { id: 7, name: "Skirts", description: "Stylish skirts for all occasions", imageUrl: null },
            { id: 8, name: "Accessories", description: "Fashion accessories and jewelry", imageUrl: null }
        ];

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            body: fallbackCategories
        };
    }
};
