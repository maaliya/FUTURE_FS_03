export default function ProductCard({ product }) {
  return (
    <div className="bg-cream rounded-2xl shadow-md p-4 w-full max-w-sm">
      <img src={product.image} alt={product.name} className="rounded-xl" />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-green font-semibold">₹{product.price}</p>
    </div>
  );
}