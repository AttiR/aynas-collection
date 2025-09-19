module.exports = async function (context, req) {
    context.log('Products Categories function processed a request.');

    const categories = [
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
        body: categories
    };
};
