import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

import type { CartItem } from "../store/useCartStore"
import { getStatusColor } from "../constants/getStatusColor"


type Order = {
  id: string
  name: string
  phone: string
  address: string
  note: string
  items: CartItem[]
  total: number
  status: string
  created_at: string
}

const Admin = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", id)
        .select()

    if (error) {
        console.error(error)
        return
    }

    // refresh list
    setOrders((prev) =>
        prev.map((order) =>
        order.id === id ? { ...order, status } : order
        )
    )
  }

  useEffect(() => {
    const fetchOrders = async () => {
        const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

        if (error) {
        console.error(error)
        return
        }

        setOrders([...(data || [])])
        setLoading(false)
    }

    fetchOrders()

    const interval = setInterval(fetchOrders, 3000)

    return () => clearInterval(interval);
  }, [])

  if (loading) {
    return <p className="p-4">Učitavanje...</p>
  }

  return (
    <section className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Trenutne Narudžbe
      </h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">{order.name}</h2>
              <span className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleString()}
              </span>
            </div>

            <p className="text-sm">📞 {order.phone}</p>
            <p className="text-sm">📍 {order.address}</p>

            {order.note && (
              <p className="text-sm italic mt-1">
                Napomena: {order.note}
              </p>
            )}

            <div className="mt-3 border-t pt-2">
              {order.items.map((item, index) => (
                <p key={index} className="text-sm">
                  {item.name} x {item.quantity}
                </p>
              ))}
            </div>

            <div className="mt-3 font-semibold">
              Ukupno: {order.total} KM
            </div>

            <div className="mt-2">
              <span className={`text-sm font-semibold ${getStatusColor(order.status)}`}>
                Status: {order.status}
              </span>
            </div>
            <div className="flex gap-2 mt-3">
            <button
                onClick={() => updateStatus(order.id, "preparing")}
                className="bg-blue-500 text-white px-3 py-1 rounded"
                disabled={order.status === "delivered"}
            >
                Prihvati
            </button>

            <button
                onClick={() => updateStatus(order.id, "delivered")}
                className="bg-green-500 text-white px-3 py-1 rounded"
                disabled={order.status === "delivered"}
            >
                Završi
            </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Admin