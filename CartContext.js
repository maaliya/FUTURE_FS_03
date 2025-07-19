import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.attributes?.Name,
          price: product.attributes?.Price,
          imageUrl:
            "http://localhost:1337" +
            product.attributes?.Image?.formats?.thumbnail?.url,
          quantity: 1,
        },
      ]);
    }
    alert("✅ Product added to cart!");
  };

  // Update quantity of an item
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
const placeOrder = () => {
  if (cart.length === 0) {
    alert("🛒 Your cart is empty.");
    return;
  }

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  alert(`✅ Order placed successfully!\n🧾 Total Amount: ₹${totalAmount}`);

  // Clear cart after placing order
  setCart([]);

//  This is where you update the provider with all functions
  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};