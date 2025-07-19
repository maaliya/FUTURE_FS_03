import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";


export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:1337/api/products?populate=*")
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 Products:", data);
        setProducts(data.data); // No 'attributes'
      })
      .catch((err) => console.error("❌ API Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* 🌟 Navbar */}
      <nav className="bg-indigo-800 text-yellow-300 px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">☕ Twinklebucks</h1>
        <div className="space-x-4">
          <a href="/cart" className="hover:underline">Cart</a>
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Products</a>
        </div>
      </nav>

      {/* 🛍️ Products Grid */}
      <div className="p-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">🛍️ Starbucks Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const { id, Name, Description, Price, Image } = product;
            const imageUrl = "http://localhost:1337" + Image?.formats?.thumbnail?.url;

            return (
              <div
                key={id}
                className="bg-blue rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={imageUrl}
                  alt={Name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold capitalize mb-2">
                    {Name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{Description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 font-bold text-lg">
                      ₹{Price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-700 text-green px-3 py-1 rounded hover:bg-green-800"
                    >
                      Add to Cart
                    </button>
                    <button>Place Order</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
