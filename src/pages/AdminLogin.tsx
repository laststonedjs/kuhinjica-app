import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (password === "1234") {
      localStorage.setItem("isAdmin", "true")
      navigate("/admin")
    } else {
      alert("Pogrešan password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default AdminLogin