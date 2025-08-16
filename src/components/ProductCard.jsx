import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useMemo, useState } from 'react';
import { useToast } from '../components/Toaster';


const ORIGIN = import.meta.env.VITE_API_ORIGIN || '';
const buildImgSrc = (p) => {
  if (!p) return '/assets/img/placeholder.webp';
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith('/uploads')) return `${ORIGIN}${encodeURI(p)}`;
  return encodeURI(p);
};

export default function ProductCard({ producto }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [talle, setTalle] = useState('');
  const precio = (producto.precio ?? 0).toLocaleString('es-AR', { style:'currency', currency:'ARS' });
  const src = buildImgSrc(producto.imagen);
  const toast = useToast();


  // Grupo sugerido por nombre (bebés vs niñas)
  const grupoTalles = useMemo(() => {
    const name = (producto?.nombre || '').toLowerCase();
    return /beb[eé]|jumper|body|ranita/.test(name) ? 'bebes' : 'ninas';
  }, [producto]);

  const TALLES_NINAS = ['2','4','6','8','10','12'];
  const TALLES_BEBES = ['0-3 m','3-6 m','6-9 m','9-12 m','12-18 m','18-24 m'];
  const talles = grupoTalles === 'bebes' ? TALLES_BEBES : TALLES_NINAS;


const onAdd = () => {
  if (!talle) { toast.push('Elegí un talle 🙂', 'warning'); return; }
  add({ ...producto, talleSeleccionado: talle }, 1);
  setAdded(true);
  toast.push('✓ Agregado al carrito');
  setTimeout(() => setAdded(false), 900);
};

  return (
    <article className="card product-card h-100">
      {/* Imagen clickeable -> detalle */}
      <Link
        to={`/producto/${producto.id}`}
        className="ratio ratio-1x1 bg-white d-block rounded-top overflow-hidden"
        aria-label={`Ver detalle de ${producto.nombre}`}
      >
        <img
          src={src}
          className="object-fit-cover w-100 h-100"
          alt={producto.nombre}
          loading="lazy"
          decoding="async"
          draggable="false"
          style={{ cursor: 'pointer' }}
          onError={(e)=>{ e.currentTarget.src='/assets/img/placeholder.webp'; }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        {/* Título clickeable -> detalle */}
        <h6 className="product-title mb-1">
          <Link to={`/producto/${producto.id}`} className="text-reset text-decoration-none">
            {producto.nombre}
          </Link>
        </h6>

        <p className="text-muted small product-desc mb-2 flex-grow-1">
          {producto.descripcion}
        </p>

        {/* Selector de talle (compacto) */}
        <div className="mb-2">
          <label className="small text-muted mb-1">Talle</label>
          <select
            className="form-select form-select-sm"
            value={talle}
            onChange={(e)=>setTalle(e.target.value)}
          >
            <option value="">Elegí un talle</option>
            {talles.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="d-flex align-items-center justify-content-between mt-auto">
          <span className="price h6 m-0">{precio}</span>
          <div className="d-grid gap-2 d-sm-flex">
            <button
              className={`btn btn-sm btn-primary ${added ? 'disabled' : ''}`}
              onClick={onAdd}
              disabled={!talle || added}
              title={!talle ? 'Elegí un talle primero' : 'Agregar al carrito'}
            >
              {added ? '✓ Agregado' : !talle ? 'Elegí talle' : 'Agregar'}
            </button>
            <Link className="btn btn-sm btn-outline-primary" to={`/producto/${producto.id}`}>
              Detalle
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
