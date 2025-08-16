// /src/pages/Carrito.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../components/Toaster';

export default function Carrito(){
  const { items, qty, remove, totalPrecio } = useCart();
  const navigate = useNavigate();
const toast = useToast();

  if(!items.length){
    return (
      <div className="container py-5 text-center">
        <h3 className="mb-3">Tu carrito está vacío</h3>
        <Link to="/" className="btn btn-primary">Ir a productos</Link>
      </div>
    );
  }

  const currency = (v) => v.toLocaleString('es-AR', { style:'currency', currency:'ARS' });

  return (
    <div className="container py-4">
      <h2 className="mb-4">Carrito</h2>
      <ul className="list-group mb-3">
        {items.map(it => (
          <li key={it.key} className="list-group-item d-flex align-items-center">
            <img
              src={/^https?:\/\//i.test(it.imagen) ? it.imagen : encodeURI(it.imagen || '/assets/img/placeholder.webp')}
              alt={it.nombre}
              className="rounded me-3"
              style={{width:70, height:70, objectFit:'cover'}}
              onError={(e)=>{ e.currentTarget.src='/assets/img/placeholder.webp'; }}
            />
            <div className="flex-grow-1">
              <div className="fw-semibold">{it.nombre}</div>
              {!!it.talleSeleccionado && (
                <div className="small text-muted">Talle: {it.talleSeleccionado}</div>
              )}
              <small className="text-muted">Precio: {currency(it.precio)}</small>
            </div>

            <input
              type="number" min="1" value={it.cantidad}
              onChange={e=>qty(it.key, Number(e.target.value))}
              className="form-control me-2" style={{width:90}}
            />
            <button
              className="btn btn-outline-danger"
              onClick={()=>{
                remove(it.key);
                toast.push(
                  `Quitado: ${it.nombre}${it.talleSeleccionado ? ` · Talle ${it.talleSeleccionado}` : ''}`,
                  'secondary'
                );
              }}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center">
        <h4>Total: {currency(totalPrecio)}</h4>
        <button className="btn btn-primary btn-lg" onClick={()=>navigate('/pago')}>Confirmar pedido</button>
      </div>
    </div>
  );
}
