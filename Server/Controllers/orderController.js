import Order from "../models/order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      address,
      paymentMethod,
      paymentIntentId,
    } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }
    console.log("cart itmes", cartItems)

    // 🔐 Calculate total securely
    let totalAmount = 0;
    const items = [];

    for (const item of cartItems) {
      const product = await Product.findById(item._id);
       if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

 if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `${product.title} out of stock` });
      }
      // 🔻 Reduce stock (CRITICAL)
      product.stock -= item.quantity;
      await product.save();
      totalAmount += product.price * item.quantity;

      items.push({
        productId: product._id,
        name: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
        description: item.description,
        color: item.color
      });
    }

    const order = await Order.create({
      userId,
      items,
      address,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "paid" : "pending",
      paymentIntentId,
      totalAmount,

    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};
export const getUserOrders = async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  res.json(orders);
};



