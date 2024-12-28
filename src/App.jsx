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
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom';

function App() {
  const [cartItem, setCartItems] = useState([]);
  const [buy,setBuy] = useState([]);
  console.log(buy);
  
  return (
    <Router>
    <Header/>
      <Routes>
       
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/products/:category" element={<ProductsPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
        <Route path="/products/:category/:id" element={<ProductView setBuy={setBuy} setCartItems={setCartItems}/>} />
        <Route path="/cart" element={<CartPage cartItem={cartItem} setBuy={setBuy}  />}/>
        <Route path="/order" element={<OrderHistoryPage buy={buy} />}/>

      </Routes>
    </Router>
  )
}

export default App
