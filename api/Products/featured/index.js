module.exports = async function (context, req) {
    context.log('Featured Products function processed a request.');

    const featuredProducts = [
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
        body: featuredProducts
    };
};
