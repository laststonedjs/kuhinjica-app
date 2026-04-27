import { Routes, Route } from "react-router-dom";
// pages
import { Home, Cart, Checkout, Success } from "./pages"

function App() {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  )
}

export default App
