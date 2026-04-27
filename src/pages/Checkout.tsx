import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCartStore } from "../store/useCartStore"

const Checkout = () => {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart )
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  })

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Molimo popunite sva obavezna polja")
      return
    }

    if (items.length === 0) {
      alert("Korpa je prazna")
      return
    }

    console.log("ORDER:", {
      customer: form,
      items,
      totalPrice,
    })

    clearCart()

    navigate("/success")
  }

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <section className="min-h-screen px-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold py-4">Checkout</h1>

      <div className="flex flex-col gap-4">
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Ime i prezime"
          className="border p-3 rounded-lg"
        />

        <input
          name="phone"
          type="text"
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="address"
          type="text"
          value={form.address}
          onChange={handleChange}
          placeholder="Adresa"
          className="border p-3 rounded-lg"
        />

        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Napomena (opcionalno)"
          className="border p-3 rounded-lg"
        />
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-lg">
        <span>Ukupno:</span>
        <span>{totalPrice} KM</span>
      </div>

      <button 
        className="mt-6 w-full bg-[#E53935] text-white py-3 rounded-xl"
        onClick={handleSubmit}
      >
        Potvrdi narudžbu
      </button>
    </section>
  )
}

export default Checkout