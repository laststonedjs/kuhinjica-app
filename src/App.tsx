import { Routes, Route } from "react-router-dom";
// pages
import { Home, Cart, Checkout } from "./pages"

function App() {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  )
}

export default App
