import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer'
import AllProducts from './Pages/AllProducts'
import Dress from './Pages/Dress'
import Shoes from './Pages/Shoes'
import Bags from './Pages/Bags'
import ScrollToTop from './ScrollToTop'
import TopSidebar from './Components/Navbar'
import CartPage from './Pages/CartPage'
import CartSidebar from './Components/CartSidebar'
import ProductDetails from './Pages/ProductDetails'
import ContactUs from './Pages/ContactUs'
import AiStylistPage from './Pages/AiStylistPage'
import AiTestClient from './Pages/AiTestClient'
import AuthPage from './Pages/AuthPage'

function App() {

  return (
    <>
      <div className="min-h-screen relative ">
        <TopSidebar isLoggedIn={false} username="Zirwa" />
        <CartSidebar />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/dress" element={<Dress />} />
          <Route path="/shoes" element={<Shoes />} />
          <Route path="/bags" element={<Bags />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/ai-stylist" element={<AiTestClient />} />
          <Route path="/sign-up" element={<AuthPage />} />

        </Routes>

        <Footer />


      </div>
    </>
  )
}

export default App
