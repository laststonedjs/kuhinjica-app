import { create } from "zustand";

type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
}

type CartStore = {
    items: CartItem[]
    addToCart: (item: Omit<CartItem, "quantity">) => void
}

export const useCartStore = create<CartStore>((set) => ({
    items: [],

    addToCart: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id)
            if (existing) {
                return {
                items: state.items.map((i) =>
                    i.id === item.id
                    ? { ...i, quantity: i.quantity + 1 }
                    : i
                ),
                }
            }

            return {
                items: [...state.items, { ...item, quantity: 1 }]
            }
        }),
}))