import { useCartStore } from "../store/useCartStore"

const Checkout = () => {
  const items = useCartStore((state) => state.items)

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <section className="min-h-screen px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold py-4">Checkout</h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ime i prezime"
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Telefon"
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Adresa"
          className="border p-3 rounded-lg"
        />

        <textarea
          placeholder="Napomena (opcionalno)"
          className="border p-3 rounded-lg"
        />
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-lg">
        <span>Ukupno:</span>
        <span>{totalPrice} KM</span>
      </div>

      <button className="mt-6 w-full bg-[#E53935] text-white py-3 rounded-xl">
        Potvrdi narudžbu
      </button>
    </section>
  )
}

export default Checkout