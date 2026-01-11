import express from "express";
import stripe from "../config/stripe.js";
import Product from "../models/Product.js";
export const getPayments = async (req, res) => {
     console.log("BODY RECEIVED:", req.body);
    try {
        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // 🔐 Calculate total from DB (IMPORTANT)
        let totalAmount = 0;

        for (const item of cartItems) {
            const product = await Product.findById(item._id);

            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            totalAmount += product.price * item.quantity;
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // cents
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Payment intent failed" });
    }
};
