import { menu } from "../data/menu"

import { useCartStore } from "../store/userCartStore"

const Home = () => {
  const addToCart = useCartStore((state) => state.addToCart)

  const items = useCartStore((state) => state.items)
  console.log(items)

  return (
    <section className='min-h-screen px-4 max-w-md mx-auto'>
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-semibold text-[#E53935]">
          Kuhinjica 🍲
        </h1>

        <button className="text-xl">
          🛒
        </button>
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