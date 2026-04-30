// seedProducts.js

import Product from './models/product.js'

export const seedProducts = async (categories) => {
  await Product.deleteMany();

  const products = [
    {
      title: "Elegant Black Tote Bag",
      description: "Spacious and stylish tote bag for everyday use.",
      category: categories.tote._id,
      price: 3200,
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
        "https://images.unsplash.com/photo-1591561954557-26941169b49e"
      ],
      variants: [
        { color: "black", size: "large", stock: 10 },
        { color: "brown", size: "large", stock: 5 }
      ],
      tags: ["casual", "daily", "fashion"],
      isFeatured: true
    },

    {
      title: "Mini Pink Handbag",
      description: "Compact mini bag for stylish outings.",
      category: categories.mini._id,
      price: 2100,
      images: [
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
      ],
      variants: [
        { color: "pink", size: "small", stock: 8 }
      ],
      tags: ["party", "cute"]
    },

    {
      title: "White Sneakers",
      description: "Comfortable everyday sneakers.",
      category: categories.sneakers._id,
      price: 4500,
      images: [
        "https://images.unsplash.com/photo-1528701800489-20be3c6c6e2b"
      ],
      variants: [
        { color: "white", size: "38", stock: 6 },
        { color: "white", size: "39", stock: 4 }
      ],
      tags: ["sport", "casual"]
    },

    {
      title: "Luxury High Heels",
      description: "Elegant heels for formal occasions.",
      category: categories.heels._id,
      price: 5500,
      images: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2"
      ],
      variants: [
        { color: "red", size: "37", stock: 3 }
      ],
      tags: ["formal", "party"],
      isFeatured: true
    }
  ];

  await Product.insertMany(products);
};

