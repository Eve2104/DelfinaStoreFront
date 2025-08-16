import { useCart } from '../contexts/CartContext';

export default function CartWidget(){
  const { totalItems, openCart } = useCart();
  return (
    <button onClick={openCart} className="btn btn-primary position-relative">
      🛍️
      <span className="badge text-bg-light badge-cart">{totalItems}</span>
    </button>
  );
}
