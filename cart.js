import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart
  } = useContext(CartContext);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    let bill = "🧾 Order Summary:\n\n";
    cart.forEach((item) => {
      bill += `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    bill += `\nTotal: ₹${total}`;
    alert(bill);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total and Order Button */}
          <div className="text-right mt-6">
            <p className="text-xl font-bold mb-4">🧾 Total: ₹{total}</p>
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
