🌸 Cruse Fashion , AI-Powered Fashion E-Commerce Platform
An intelligent, modern, cinematic fashion shopping experience.
Cruse Fashion is a full-stack, AI-powered e-commerce platform designed to deliver a premium online shopping experience.
Built with Node.js, Express, MongoDB, React (frontend) and Gemini AI, the website offers a sleek, cinematic, minimal UI with a fully functional shopping system ,  including cart, checkout, product filters, admin dashboard, and an intelligent AI Personal Stylist that recommends complete outfits based on user preferences.

✨ Core Features
🧠 AI Stylist (Flagship Feature)
A smart stylist powered by Google Gemini 2.5 Flash that understands natural language like:
“I need a cream dress for a wedding under 12,000 with a minimal look.”
The AI extracts:
Category (dress, shoes, bag)
Color
Occasion
Budget
Style
It then recommends a complete outfit (dress + shoes + bag) from the shop’s database , with a friendly explanation message.
This turns basic browsing into an interactive styling experience.

🛒 Fully Functional E-Commerce
Product listing with category filters
Product detail pages
Add to cart / remove from cart
Dynamic cart sidebar
Checkout integration (Stripe-ready)
Quantity management
Mobile-optimized product grid
🛠️ Admin Dashboard
Add new products
Edit products
Delete products
Upload images
Manage users
Fully authenticated routes

🔐 Authentication
Secure user auth using Passport.js
Sessions + cookies
Protected routes for admin sections

🎨 Frontend UI (React + Tailwind + Framer Motion)
The UI is built with a minimalist, luxury-fashion aesthetic:
Soft beige/neutral shadows
Clean spacing & perfect alignment
Cinematic animations
Crisp typography
Fully mobile responsive
Elegant product cards + spacing system
Modern AI chat interface

🧬 Tech Stack
Frontend
React.js
React Router
Tailwind CSS
Framer Motion
Lucide Icons
Backend
Node.js
Express.js
MongoDB + Mongoose
Multer (image upload)
Cloudinary (for images)

AI
Google Gemini GenAI (2.5 Flash model)
Payments
Stripe (integration ready)

🚀 AI Workflow Summary
User sends a natural-language input
AI extracts structured preferences (JSON)
Backend queries MongoDB for matching products
AI generates a friendly stylist message
UI displays:
AI message
Extracted preferences
Recommended outfit set (dress, shoes, bag)

📱 Mobile-First & Responsive

The entire website is built mobile-first, ensuring a premium experience on:
✔ iPhone
✔ Android
✔ Tablets
✔ Small-screen laptops

📦 Folder Structure (Simplified)
CRUSE
├── Server/ 
|   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── server.js
│
├──  Client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── public/
│
└── README.md

🌟 Why This Project Matters

Cruse Fashion is not just an online store.
It is a modern AI-driven fashion experience that blends technology with personalized styling.
Perfect for portfolio, professional work, and showcasing your full-stack + AI skills.

📌 Future Enhancements
AI color palette recommendations
Seasonal lookbooks
User-based AI personalization
Try-on AI (image input)

❤️ Credits
Designed & Developed by Zirwa
Full-stack development + AI integration