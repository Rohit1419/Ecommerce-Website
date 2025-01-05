import { getCart } from "../lib/db/cart";
import CartEntry from "./CartEntry";
import { formatPrice } from "../lib/db/format";
import { setProductQuantity } from "./action"; // Changed this import

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {!cart?.items.length && <p>Your Cart is Empty</p>}
      {cart?.items.map(cartItem => (
        <CartEntry 
          cartItem={cartItem} 
          key={cartItem.id} 
          setProductQuantity={setProductQuantity}  // Now using the correct action
        />
      ))}
    
    </div>
  );
}
