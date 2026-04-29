import { useNavigate } from "react-router-dom"
// import { useEffect } from "react"

const Success = () => {
  const navigate = useNavigate()

//   useEffect(() => {
//     const flag = localStorage.getItem("orderPlaced")

//     if(!flag) {
//         navigate("/", { replace: true })
//     } else {
//         localStorage.removeItem("orderPlaced")
//     }
//   }, [navigate])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-semibold mb-4">
        ✅ Vaša narudžba je uspješno poslana!
      </h1>
      <p className="text-gray-600">
        Hvala Vam! Restoran će uskoro obraditi tvoju narudžbu.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-[#E53935] text-white px-6 py-3 rounded-xl"
      >
        Nazad na meni
      </button>
    </section>
  )
}

export default Success