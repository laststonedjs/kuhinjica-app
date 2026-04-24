import { useCartStore } from "../store/useCartStore";

const Cart = () => {
  const items = useCartStore((state) => state.items)

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

              <div className="font-semibold">
                {item.price * item.quantity} KM
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Cart