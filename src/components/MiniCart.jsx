// /src/components/MiniCart.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from './Toaster';

export default function MiniCart(){
  const { isOpen, closeCart, items, qty, remove, totalPrecio } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  const srcOf = (p) => !p ? '/assets/img/placeholder.webp'
    : /^https?:\/\//i.test(p) ? p : encodeURI(p);

  const goCheckout = () => { closeCart(); navigate('/pago'); };

  return (
    <>
      <div className={`mini-cart-overlay ${isOpen ? 'show' : ''}`} onClick={closeCart} />
      <aside className={`mini-cart ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="mini-cart-header">
          <h5 className="m-0">Tu carrito</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={closeCart}>✕</button>
        </div>

        <div className="mini-cart-body">
          {items.length === 0 ? (
            <p className="text-muted">Aún no agregaste productos.</p>
          ) : (
            <ul className="list-unstyled m-0">
              {items.map(it => (
                <li key={it.key} className="mini-item">
                  <img src={srcOf(it.imagen)} alt={it.nombre}
                       onError={(e)=>{ e.currentTarget.src='/assets/img/placeholder.webp'; }} />
                  <div className="mini-info">
                    <div className="mini-title">{it.nombre}</div>
                    {!!it.talleSeleccionado && (
                      <div className="mini-attr small text-muted">Talle: {it.talleSeleccionado}</div>
                    )}

                    <div className="mini-controls">
                      <input
                        type="number" min="1" value={it.cantidad}
                         onChange={e => qty(it.key, Number(e.target.value))}
                        className="form-control form-control-sm" style={{ width: 70 }}
                      />
                      <span className="mini-subtotal">
                        {(it.precio * it.cantidad).toLocaleString('es-AR', { style:'currency', currency:'ARS' })}
                      </span>
                         <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        remove(it.key);
                        toast.push(
                          `Quitado: ${it.nombre}${it.talleSeleccionado ? ` · Talle ${it.talleSeleccionado}` : ''}`,
                          'secondary'
                        );
                      }}
                    >
                      Quitar
                    </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mini-cart-footer">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Total</strong>
            <strong>{totalPrecio.toLocaleString('es-AR', { style:'currency', currency:'ARS' })}</strong>
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" disabled={!items.length} onClick={goCheckout}>
              Confirmar compra
            </button>
            <Link className="btn btn-outline-secondary" to="/carrito" onClick={closeCart}>
              Ver carrito
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
