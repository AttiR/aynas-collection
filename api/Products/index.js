module.exports = async function (context, req) {
    context.log('Products function processed a request.');

    const products = [
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

    const response = {
        products: products,
        totalCount: products.length,
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
        body: response
    };
};
