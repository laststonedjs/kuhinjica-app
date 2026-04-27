import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const items = useCartStore((state) => state.items)
  const increase = useCartStore((state) => state.increaseQuantity)
  const decrease = useCartStore((state) => state.decreaseQuantity)
  const navigate = useNavigate()

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <section className="min-h-screen px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold py-4">Korpa</h1>

      <div className="flex flex-col gap-4">
        {items.length === 0 ? (
          <p className="text-gray-500">Korpa je prazna</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  {item.price} KM x {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">

                <button
                    onClick={() => decrease(item.id)}
                    className="px-2 py-1 border rounded"
                >
                    -
                </button>   

                <span>{item.quantity}</span>

                <button
                    onClick={() => increase(item.id)}
                    className="px-2 py-1 border rounded "
                >
                    +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-lg">
        <span>Ukupno:</span>
        <span>{totalPrice} KM</span>
      </div>

      {/* CHECKOUT */}
      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 w-full bg-[#E53935] text-white py-3 rounded-xl"
      >
        Nastavi na checkout
      </button>

      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-600 mt-6"
      >
        ← Nazad
      </button>
    </section>  
  )
}

export default Cart