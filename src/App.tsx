import { Routes, Route } from "react-router-dom";
// pages
import { Home, Cart, Checkout, Success, Admin, AdminLogin } from "./pages"
// components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } /> 
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </div>
  )
}

export default App
