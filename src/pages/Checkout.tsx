import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { useCartStore } from "../store/useCartStore"
import toast from "react-hot-toast"

import { supabase } from "../lib/supabase"

const Checkout = () => {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart )
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  })
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/")
    }
  }, [items, navigate])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Molimo popunite sva obavezna polja")
      return
    }

    if (items.length === 0) {
      toast.error("Korpa je prazna")
      return
    }

    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        name: form.name,
        phone: form.phone,
        address: form.address,
        note: form.note,
        items,
        total: totalPrice,
      },
    ])

    if(error) {
      console.error(error)
      toast.error("Greška pri slanju narudžbe")
      setLoading(false)
      return
    }

    clearCart()
    setLoading(false);

    toast.success("Narudžba uspješno poslana!", {
      duration: 5000,
    })
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
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        />

        <input
          name="phone"
          type="text"
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        />

        <input
          name="address"
          type="text"
          value={form.address}
          onChange={handleChange}
          placeholder="Adresa"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        />

        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="Napomena (opcionalno)"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E53935]"
        />
      </div>

      <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-lg">
        <span>Ukupno:</span>
        <span>{totalPrice} KM</span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-xl text-white ${
          loading ? "bg-gray-400" : "bg-[#E53935]"
        }`}
      >
        {loading ? "Slanje..." : "Potvrdi narudžbu"}
      </button>
    </section>
  )
}

export default Checkout