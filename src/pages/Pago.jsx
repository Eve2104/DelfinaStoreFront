import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { confirmarCarrito } from '../services/carrito';
import { useToast } from '../components/Toaster';

export default function Pago(){
  const { items, clear, totalPrecio } = useCart();
  const [status, setStatus] = useState('idle'); // idle | loading | ok | err
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
const toast = useToast();
  // si no hay items (y no terminó ok), redirijo a Home
  if (!items.length && status !== 'ok') {
    return (
      <div className="container py-5 text-center">
        <h3 className="mb-3">Tu carrito está vacío</h3>
        <Link to="/" className="btn btn-primary">Ir a productos</Link>
      </div>
    );
  }

  // util mínimo para imágenes (sin helper)
  const srcOf = (p) => {
    if (!p) return '/assets/img/placeholder.webp';
    if (/^https?:\/\//i.test(p)) return p;
    return encodeURI(p); // '/uploads/...' o '/assets/...'
  };

  const currency = (v) => v.toLocaleString('es-AR', { style:'currency', currency:'ARS' });

  const subtotal = useMemo(() => items.reduce((a,i)=>a + i.precio*i.cantidad, 0), [items]);
  const shippingLabel = 'A coordinar'; // UI: no cobramos aquí
  const totalFmt = currency(totalPrecio);
  const subtotalFmt = currency(subtotal);

  const onConfirm = async (e) => {
    e.preventDefault();

try{
  setStatus('loading'); setMsg('');
  await confirmarCarrito(items);
  setStatus('ok'); setMsg('¡Pedido confirmado!');
  toast.push('Pedido confirmado 🎉');
  clear();
  setTimeout(()=> navigate('/'), 1200);
}catch(err){
  const m = err?.response?.data?.message || err.message || 'Error al confirmar';
  setStatus('err'); setMsg(m);
  toast.push(m, 'danger');
}
  };

  return (
    <div className="container-xl py-4">
      <div className="mb-3 small">
        <Link to="/carrito" className="link-underline">← Volver al carrito</Link>
      </div>

      <div className="row g-4">
        {/* Resumen */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm checkout-card">
            <div className="card-header bg-white border-0 pb-0">
              <h3 className="h5 m-0">Resumen de tu compra</h3>
              <p className="text-muted small m-0">Revisá los productos antes de confirmar</p>
            </div>

            <ul className="list-group list-group-flush checkout-items">
              {items.map(it => (
                <li className="list-group-item py-3" key={it.id}>
                  <div className="d-grid align-items-center" style={{ gridTemplateColumns: '72px 1fr auto' }}>
                    <img
                      src={srcOf(it.imagen)}
                      alt={it.nombre}
                      className="checkout-thumb"
                      onError={(e)=>{ e.currentTarget.src='/assets/img/placeholder.webp'; }}
                    />
                    <div className="px-2">
                      <div className="fw-semibold">{it.nombre}</div>
                      <div className="text-muted small">
                        {currency(it.precio)} • Cant.: {it.cantidad}
                      </div>
                    </div>
                    <div className="text-end fw-semibold text-primary">
                      {currency(it.precio * it.cantidad)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="card-footer bg-white border-0 pt-0">
              <div className="d-flex justify-content-between small text-muted">
                <span>¿Necesitás cambiar cantidades?</span>
                <Link to="/carrito" className="link-underline">Editar carrito</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Totales + Confirmación */}
        <div className="col-12 col-lg-5">
          {status==='err' && <div className="alert alert-danger">{msg}</div>}
          {status==='ok'  && <div className="alert alert-success">{msg}</div>}

          <div className="card shadow-sm checkout-sticky">
            <div className="card-body">
              <h4 className="h5 mb-3">Confirmación</h4>

              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Subtotal</span>
                <span>{subtotalFmt}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Envío</span>
                <span className="text-muted">{shippingLabel}</span>
              </div>

              <div className="d-flex justify-content-between align-items-center border-top pt-3 mb-3">
                <strong>Total</strong>
                <strong className="h5 text-primary m-0">{totalFmt}</strong>
              </div>

              <form onSubmit={onConfirm} className="d-grid gap-2">
                <button className="btn btn-primary btn-lg" disabled={status==='loading'}>
                  {status==='loading' ? (
                    <span className="d-inline-flex align-items-center gap-2">
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Procesando...
                    </span>
                  ) : 'Confirmar compra'}
                </button>
                <Link to="/carrito" className="btn btn-outline-secondary">Volver al carrito</Link>
              </form>

              <p className="small text-muted mt-3 mb-0">
                Al confirmar aceptás nuestros <a href="#" className="link-underline">Términos</a> y <a href="#" className="link-underline">Política de privacidad</a>.
              </p>
            </div>
          </div>

          {/* Sellos de confianza */}
          <div className="row g-3 mt-3">
            <div className="col-12 col-sm-4">
              <div className="p-3 bg-white border rounded-3 h-100 text-center">🔒
                <div className="fw-semibold mt-1">Compra segura</div>
                <div className="small text-muted">Datos protegidos</div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="p-3 bg-white border rounded-3 h-100 text-center">🚚
                <div className="fw-semibold mt-1">Envíos a todo el país</div>
                <div className="small text-muted">Coordinamos por mail</div>
              </div>
            </div>
            <div className="col-12 col-sm-4">
              <div className="p-3 bg-white border rounded-3 h-100 text-center">🤝
                <div className="fw-semibold mt-1">Atención personalizada</div>
                <div className="small text-muted">Estamos para ayudarte</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
