import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from './context/CartContext'
import Beranda from './pages/beranda'
import AuthPage from './pages/auth'
import Produk from './pages/produk'
import Keranjang from './pages/keranjang'
import Checkout from './pages/checkout'
import TentangKami from './pages/tentangkami'

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/produk" element={<Produk />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/tentang" element={<TentangKami />} />
        </Routes>
      </Router>
    </CartProvider>
  )
}

export default App