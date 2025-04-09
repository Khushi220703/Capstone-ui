import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import CartPage from './pages/CartPage'
import OrderHistoryPage from './pages/OrderPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SingupPage'
import ProductView from './pages/ProductView'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/Product'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoutes'

function App() {
  const [cartItem, setCartItems] = useState([]);
  const [buy, setBuy] = useState([]);
  console.log(buy);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/homePage" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        
        <Route path="/products/:category" element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        } />

        <Route path="/products/:category/:id" element={
          <ProtectedRoute>
            <ProductView setBuy={setBuy} setCartItems={setCartItems} />
          </ProtectedRoute>
        } />

        <Route path="/cart" element={
          <ProtectedRoute>
            <CartPage cartItem={cartItem} setBuy={setBuy} />
          </ProtectedRoute>
        } />

        <Route path="/order" element={
          <ProtectedRoute>
            <OrderHistoryPage buy={buy} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App;
