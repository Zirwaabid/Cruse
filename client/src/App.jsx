import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './Components/Footer'
import AllProducts from './Pages/ProductsPages/AllProducts'
import Dress from './Pages/ProductsPages/Dress'
import Shoes from './Pages/ProductsPages/Shoes'
import Bags from './Pages/ProductsPages/Bags'
import ScrollToTop from './ScrollToTop'
import TopSidebar from './Components/Navbar'
import CartPage from './Pages/CartPage'
import CartSidebar from './Components/CartSidebar'
import ProductDetails from './Pages/ProductsPages/ProductDetails'
import ContactUs from './Pages/ContactUs'

import AiTestClient from './Pages/AiTestClient'

import { AuthProvider } from './context/AuthContext'
import { LogIn } from 'lucide-react'
import { ProtectedRoute } from './Routes/ProtectedRoutes'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {

  return (
    <>
      <div className="min-h-screen relative ">
        {/* <BrowserRouter> */}
        <AuthProvider>

          <TopSidebar />
          <CartSidebar />
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/dress" element={<Dress />} />
            <Route path="/shoes" element={<Shoes />} />
            <Route path="/bags" element={<Bags />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/ai-stylist" element={<AiTestClient />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>

                  <Profile />
                </ProtectedRoute>

              }
            />

          </Routes>

          <Footer />

        </AuthProvider>

        {/* </BrowserRouter> */}
      </div>
    </>
  )
}

export default App
