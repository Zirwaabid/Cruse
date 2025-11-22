// seedProducts.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const data = [
    {
        title: "Embroidered Lawn Dress",
        description: "A beautiful 3-piece embroidered lawn suit in soft lilac shade with chiffon dupatta. Perfect for daytime events.",
        category: "dress",
        price: 5200,
        image: "https://cdn-live.bareeze.com/bareeze/products/product_images/pr1699_purple_2_.jpg",
        color: ["lilac", "purple"],
        styleTags: ["party", "summer", "formal", "embroidered"],
        stock: 10,
        famous: true,
    },
    {
        title: "Angoori Cotton Kurta Set",
        description: "Elegant angoori green cotton kurta with minimal silver embroidery, ideal for semi-formal gatherings.",
        category: "dress",
        price: 4800,
        image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/2025/SEPTEMBER/17/osP1HsUX_0cb819d64aca45a4a21792277c2db0c7.jpg",
        color: ["green", "silver"],
        styleTags: ["semi-formal", "day-wear", "traditional"],
        stock: 8
    },
    {
        title: "Royal Purple Organza Dress",
        description: "Organza 3-piece suit with zari and gota detailing, paired with raw silk trousers and organza dupatta. A must-have for parties.",
        category: "dress",
        price: 6200,
        image: "https://sanasafinaz.com/cdn/shop/files/fw24for295p2t_1.jpg?height=2048&v=1756730567&width=2048",
        color: ["purple", "gold"],
        styleTags: ["party", "formal", "wedding"],
        stock: 5,
        famous: true,
    },
    {
        title: "Peach Blossom Lawn Suit",
        description: "Soft peach digital-printed lawn suit with subtle lace finishing, perfect for casual wear.",
        category: "dress",
        price: 3600,
        image: "https://original.pk/cdn/shop/products/0126_2S24P3P036-052A2412_900x_f9c600f6-d365-44f4-9046-fb361df29b4f.jpg?v=1706712536",
        color: ["peach", "white"],
        styleTags: ["casual", "summer", "printed"],
        stock: 12
    },
    {
        title: "Midnight Black Velvet Dress",
        description: "Deep black velvet kameez with intricate dabka work — designed for winter evening parties.",
        category: "dress",
        price: 8900,
        image: "https://rangrezofficial.com/cdn/shop/files/34_216e0149-a3b2-4e2a-b0e5-d0baaf870cce.jpg?v=1700736743",
        color: ["black"],
        styleTags: ["winter", "party", "luxury"],
        stock: 6,
        famous: true,
    },
    {
        title: "Pastel Pink Chiffon Dress",
        description: "Delicate chiffon dress with hand embroidery and matching dupatta. Light and graceful for festive occasions.",
        category: "dress",
        price: 5700,
        image: "https://www.frontierraas.com/pub/media/catalog/product/f/r/fr12163888-_2_.jpg",
        color: ["pink", "white"],
        styleTags: ["festive", "formal", "embroidered"],
        stock: 9
    },
    {
        title: "Classic Black Cotton Kurti",
        description: "Black straight-cut cotton kurti with white thread work — a timeless classic for everyday style.",
        category: "dress",
        price: 2900,
        image: "https://diners.com.pk/cdn/shop/products/WKL-1099-BLACK-RS-3290-01.jpg?v=1686086255",
        color: ["black", "white"],
        styleTags: ["casual", "office", "everyday"],
        stock: 15
    },
    {
        title: "Mehndi Green Embroidered Suit",
        description: "Traditional mehndi green 3-piece embroidered dress with zari borders — perfect for wedding events.",
        category: "dress",
        price: 6400,
        image: "https://www.nameerabyfarooq.com/cdn/shop/files/MehndiGreenEmbroideredPakistaniSalwarKameezStyleSuit_1080x.jpg?v=1699883730",
        color: ["green", "gold"],
        styleTags: ["wedding", "mehndi", "traditional"],
        stock: 7
    },
    {
        title: "Cream and Maroon Silk Dress",
        description: "Rich silk shirt with maroon embroidery and matching trousers, ideal for formal dinners or Eid.",
        category: "dress",
        price: 7500,
        image: "https://pakistanimoda.com/cdn/shop/files/Haneen_DesignerMaroonShortShirtandTrouserSetforFormalEvents1.jpg?v=1750614509",
        color: ["cream", "maroon"],
        styleTags: ["eid", "formal", "luxury"],
        stock: 5
    },
    {
        title: "Lavender Lawn 3-Piece",
        description: "Lavender printed lawn suit with embroidered neckline and chiffon dupatta. Elegant and comfortable.",
        category: "dress",
        price: 4500,
        image: "https://i.pinimg.com/736x/13/b5/64/13b5641a57d5f22c8d9f2f33e0261a8c.jpg",
        color: ["lavender", "purple"],
        styleTags: ["summer", "casual", "printed"],
        stock: 10
    },
    {
        title: "Purple Embellished Khussa",
        description: "Traditional khussa in deep purple shade with gold hand embroidery — perfect for party or festive wear.",
        category: "shoe",
        price: 2200,
        image: "https://cdn.shopify.com/s/files/1/2337/7003/files/0019_IMG_4994_97a47177-aa58-4c1d-ade9-bd6bae6a0a2e.jpg?v=1729488456",
        color: ["purple", "gold"],
        styleTags: ["party", "festive", "traditional"],
        stock: 10
    },
    {
        title: "Golden Heeled Sandals",
        description: "Elegant gold-toned sandals with medium heel — ideal for weddings or formal events.",
        category: "shoe",
        price: 3400,
        image: "https://ae01.alicdn.com/kf/S9c7e10e44a35446a9e804358e82f55ee5.jpg",
        color: ["gold"],
        styleTags: ["wedding", "formal", "luxury"],
        stock: 6,
        famous: true,
    },
    {
        title: "Lilac Flat Pumps",
        description: "Soft lilac flat pumps with subtle shine finish — comfortable and stylish for day events.",
        category: "shoe",
        price: 1800,
        image: "https://www.kaileep.com/cdn/shop/files/E380D897-8885-4D0C-83BC-5EEE1F658371_1800x1800.jpg",
        color: ["lilac", "purple"],
        styleTags: ["casual", "party", "day-wear"],
        stock: 12
    },
    {
        title: "Black Block Heels",
        description: "Classic black block heels that go well with any outfit — modern yet elegant.",
        category: "shoe",
        price: 3100,
        image: "https://zapatla.pk/cdn/shop/files/zw-1513b_d21cc690-a8bc-4970-bca0-c49f6cefb7b7.jpg?v=1746636442&width=1946",
        color: ["black"],
        styleTags: ["formal", "office", "party"],
        stock: 9,
        famous: true,
    },
    {
        title: "Silver Party Sandals",
        description: "Sparkling silver sandals with delicate strap design — ideal for evening functions.",
        category: "shoe",
        price: 3300,
        image: "https://www.sojoee.com/wp-content/uploads/2022/03/FTW-1126a-Womens-Silver-wedding-sandals.jpg",
        color: ["silver"],
        styleTags: ["party", "wedding", "evening"],
        stock: 7
    },
    {
        title: "Peach Casual Slides",
        description: "Soft peach-colored slides for everyday comfort — trendy and easy to match with pastel dresses.",
        category: "shoe",
        price: 1500,
        image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1745938462-LW9FLQS_071417_1.jpg?crop=1.00xw:0.834xh;0,0.166xh&resize=980:*",
        color: ["peach"],
        styleTags: ["casual", "summer", "day-wear"],
        stock: 15,
        famous: true,
    },
    {
        title: "Navy Velvet Khussa",
        description: "Rich navy velvet khussa with silver dabka work, designed for winter evening looks.",
        category: "shoe",
        price: 2900,
        image: "https://generation.com.pk/cdn/shop/files/W24F2653_Blue_800x.jpg?v=1754998136",
        color: ["navy blue", "silver"],
        styleTags: ["party", "winter", "traditional"],
        stock: 6
    },
    {
        title: "Cream Embroidered Heels",
        description: "Cream-colored heels with maroon embroidery — elegant choice for Eid or formal dinners.",
        category: "shoe",
        price: 3200,
        image: "https://i.ebayimg.com/images/g/nuwAAeSw821opdVx/s-l1200.jpg",
        color: ["cream", "maroon"],
        styleTags: ["eid", "formal", "luxury"],
        stock: 5
    },
    {
        title: "Lavender Strap Sandals",
        description: "Delicate lavender strap sandals with comfortable sole, perfect for summer gatherings.",
        category: "shoe",
        price: 2000,
        image: "https://i.pinimg.com/736x/6e/0d/7a/6e0d7ab86c7f5e5fb7b05dfc7e68ccb4.jpg",
        color: ["lavender", "purple"],
        styleTags: ["summer", "casual", "party"],
        stock: 10
    },
    {
        title: "Purple Embroidered Clutch",
        description: "Elegant purple clutch with golden embroidery — ideal for party wear or wedding events.",
        category: "bag",
        price: 2500,
        image: "https://i.etsystatic.com/31592924/r/il/fa7a9e/5050952741/il_570xN.5050952741_1h03.jpg",
        color: ["purple", "gold"],
        styleTags: ["party", "wedding", "festive"],
        stock: 10
    },
    {
        title: "Golden Chain Handbag",
        description: "Stylish golden handbag with chain strap — perfect for formal dinners or Eid gatherings.",
        category: "bag",
        price: 3200,
        image: "https://onehub.pk/cdn/shop/files/Womens_Geometric_Pattern_Embossed_Chain_Shoulder_Tote_Bag_With_Magnetic_Button__Large_Capacity_Plus_Zipper_Coin_Purse__SHEIN_main_0.jpg?v=1703835905",
        color: ["gold"],
        styleTags: ["formal", "eid", "luxury"],
        stock: 8
    },
    {
        title: "Lilac Mini Shoulder Bag",
        description: "Trendy lilac shoulder bag with silver buckle detail — chic choice for day parties or brunch outings.",
        category: "bag",
        price: 2100,
        image: "https://www.malonesouliers.com/cdn/shop/files/AUDREYMINI32_LILAC_SATIN.jpg?v=1751900907&width=2400",
        color: ["lilac", "purple"],
        styleTags: ["casual", "party", "summer"],
        stock: 12,
        famous: true,
    },
    {
        title: "Angoori Green Tote Bag",
        description: "Spacious angoori green tote bag crafted with soft faux leather — a perfect mix of comfort and class.",
        category: "bag",
        price: 2700,
        image: "https://www.totes.com.pk/cdn/shop/files/Green-front.jpg?v=1736756521",
        color: ["green", "gold"],
        styleTags: ["semi-formal", "day-wear", "traditional"],
        stock: 9
    },
    {
        title: "Black Quilted Handbag",
        description: "Classic black quilted handbag with gold chain — timeless and elegant for any occasion.",
        category: "bag",
        price: 3400,
        image: "https://m.media-amazon.com/images/I/51fx5L1PP-L._AC_SL1000_.jpg",
        color: ["black", "gold"],
        styleTags: ["formal", "office", "party"],
        stock: 10,
        famous: true,
    },
    {
        title: "Silver Clutch with Stones",
        description: "Shimmering silver clutch with stone embellishment — adds glam to your evening or wedding look.",
        category: "bag",
        price: 2800,
        image: "https://img.alicdn.com/imgextra/i4/6000000005533/O1CN01Dx0dxw1qkALX19nFm_!!6000000005533-0-tbvideo.jpg",
        color: ["silver"],
        styleTags: ["party", "evening", "wedding"],
        stock: 6
    },
    {
        title: "Peach Hand Embroidered Pouch",
        description: "Delicate peach pouch with hand embroidery — lightweight and perfect for summer wear.",
        category: "bag",
        price: 1900,
        image: "https://eyaas.in/cdn/shop/files/EYAAS_4989_Creative__1.jpg?v=1747979304",
        color: ["peach"],
        styleTags: ["casual", "summer", "festive"],
        stock: 15,
        famous: true,

    },
    {
        title: "Navy Blue Velvet Clutch",
        description: "Rich navy blue velvet clutch with silver embroidery — best for winter parties or formal events.",
        category: "bag",
        price: 2600,
        image: "https://sc04.alicdn.com/kf/Hc1f323c0312f4a3a8f74dc93f414d2c8T.png",
        color: ["navy blue", "silver"],
        styleTags: ["party", "winter", "luxury"],
        stock: 7,
        famous: true,
    },
    {
        title: "Cream and Maroon Crossbody Bag",
        description: "Elegant cream bag with maroon detailing and adjustable strap — versatile for formal or casual looks.",
        category: "bag",
        price: 3000,
        image: "https://digital4.michaelkors.com/refreshes/2025/fall/refresh3/global/desktop/cig/CROSSBODIES_07_08.jpg",
        color: ["cream", "maroon"],
        styleTags: ["eid", "formal", "day-wear"],
        stock: 8
    },
    {
        title: "Lavender Handbag with Bow",
        description: "Cute lavender handbag with bow design — stylish for casual meetups and summer parties.",
        category: "bag",
        price: 2300,
        image: "https://suitechild.com/cdn/shop/products/f5ab339eb4fc39b4fdc00f8e214b979d_1200x.webp?v=1681329745",
        color: ["lavender", "purple"],
        styleTags: ["summer", "casual", "party"],
        stock: 10,
        famous: true,
    }
]

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");
        await Product.deleteMany({});
        console.log("🗑️  Cleared existing products");
        await Product.insertMany(data);
        console.log("✨ Inserted seed products");
        mongoose.connection.close();
        console.log("🔒 Disconnected");
    } catch (err) {
        console.error("❌ Error seeding DB", err);
        process.exit(1);
    }
};

seedDB();
