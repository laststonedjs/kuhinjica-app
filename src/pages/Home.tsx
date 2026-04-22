import { menu } from "../data/menu"

import { useCartStore } from "../store/userCartStore"

const Home = () => {
  const addToCart = useCartStore((state) => state.addToCart)

  const items = useCartStore((state) => state.items)
  console.log(items)
  // count total quantity of added products
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <section className='min-h-screen px-4 max-w-md mx-auto'>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold text-[#E53935]">
          Kuhinjica 🍲
        </h1>

        <div className="relative w-fit">
          <button className="text-xl">
            🛒
          </button>

          {totalItems > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#E53935] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow">
              {totalItems}
            </span>
          )}
        </div>
      </header>
      <div className="mt-4 flex flex-col gap-4">
      {menu.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-xl p-4 flex items-center justify-between"
        >
          <div>
            <h2 className="font-semibold text-lg">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.price} KM</p>
          </div>

          <button 
            onClick={() =>
              addToCart({
                id: item.id,
                name: item.name,
                price: item.price
              })
            }
            className="bg-[#E53935] text-white px-3 py-1 rounded-lg hover:opacity-90"
          >
            Dodaj
          </button>
        </div>
      ))}
    </div>
    </section>
  ) 
}

export default Home